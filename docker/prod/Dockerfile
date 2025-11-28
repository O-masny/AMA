# --- Stage 1: Node builder ---
FROM node:20-alpine AS node-builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN printf '%s\n' "#!/bin/sh" "echo 'php shim: noop'" "exit 0" > /usr/local/bin/php \
    && chmod +x /usr/local/bin/php

COPY resources ./resources
COPY vite.config.* ./
COPY tsconfig*.json ./

RUN npm run build


# --- Stage 2: PHP Runtime ---
FROM php:8.3-fpm-alpine

WORKDIR /var/www

RUN apk add --no-cache \
        libzip-dev \
        unzip \
        oniguruma-dev \
        sqlite-dev \
        bash \
        git \
        curl \
        icu-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        libwebp-dev \
        freetype-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install pdo pdo_sqlite bcmath zip intl gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

# Zkopíruj build PŘÍMO do finální cesty
COPY --from=node-builder /app/public/build ./public/build

# ✅ NOVÉ: Vytvoř záložní kopii public pro entrypoint
RUN mkdir -p /var/www-template && cp -r /var/www/public /var/www-template/

# Vytvoř základní strukturu storage
RUN mkdir -p storage/database storage/framework/sessions \
             storage/framework/views storage/framework/cache \
             storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache

# Nastav práva pro build assets
RUN chown -R www-data:www-data public/build

# Zkopíruj entrypoint script
COPY docker/prod/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN { \
    echo "upload_max_filesize=50M"; \
    echo "post_max_size=55M"; \
} > /usr/local/etc/php/conf.d/uploads.ini

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]