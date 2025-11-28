# --- Stage 1: Node builder ---
FROM node:20-alpine AS node-builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY resources ./resources
COPY vite.config.* ./
COPY tsconfig*.json ./
COPY public ./public

RUN npm run build

# Přesun manifestu z .vite do build/ (Vite 4+)
RUN cp -r public/build/.vite/* public/build/ \
    && rm -rf public/build/.vite

# --- Stage 2: PHP 8.3 ---
FROM php:8.3-fpm-alpine
WORKDIR /var/www

RUN apk add --no-cache \
    libzip-dev unzip oniguruma-dev sqlite-dev bash git curl icu-dev \
    libpng-dev libjpeg-turbo-dev libwebp-dev freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo pdo_mysql pdo_sqlite bcmath zip intl gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

# Copy Node build
COPY --from=node-builder /app/public/build ./public/build

# Nastavení práv
RUN chown -R www-data:www-data bootstrap/cache storage public/build \
    && chmod -R 775 bootstrap/cache storage public/build

RUN echo "upload_max_filesize=50M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=55M" >> /usr/local/etc/php/conf.d/uploads.ini

# Persistent storage jen pro storage a cache
VOLUME ["/var/www/storage", "/var/www/bootstrap/cache"]

EXPOSE 9000

COPY docker/prod/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm", "-F", "-R"]
