# --- Stage 1: Node builder ---
FROM node:20-alpine AS node-builder
WORKDIR /app

# Kopíruj package.json + lock a nainstaluj deps
COPY package*.json ./
RUN npm ci

# Zkopíruj zdrojáky (jen to, co je potřeba pro build)
COPY resources ./resources
COPY vite.config.* ./
COPY tsconfig*.json ./

# Proveď build
RUN npm run build


# --- Stage 2: Base image s PHP 8.3 ---
FROM php:8.3-fpm-alpine

WORKDIR /var/www

# Systémové závislosti + intl + GD s WebP
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

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Kopírování aplikace
COPY . .

# Composer dependencies (production)
RUN composer install --no-dev --optimize-autoloader

# Překopíruj frontend build z node stage
COPY --from=node-builder /app/public/build ./public/build

# Nastavení práv pro storage, cache a databázi
RUN chown -R www-data:www-data storage bootstrap/cache database

EXPOSE 9000
CMD ["php-fpm"]
