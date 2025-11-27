# --- Stage 1: Node builder ---
FROM node:20-alpine AS node-builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend sources
COPY resources ./resources
COPY vite.config.* ./
COPY tsconfig*.json ./
COPY public ./public

# Build frontend
RUN npm run build


# --- Stage 2: Base image with PHP 8.3 ---
FROM php:8.3-fpm-alpine

WORKDIR /var/www

# System deps + PHP extensions (PDO MySQL fix included)
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
    && docker-php-ext-install \
        pdo pdo_mysql pdo_sqlite bcmath zip intl gd

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Laravel app
COPY . .

# Composer production install
RUN composer install --no-dev --optimize-autoloader

# Copy frontend build artifacts
COPY --from=node-builder /app/public/build ./public/build

# Storage symlink
RUN php artisan storage:link || true

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache database public/build \
    && chmod -R 775 storage bootstrap/cache

# PHP config
RUN echo "upload_max_filesize=50M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=55M" >> /usr/local/etc/php/conf.d/uploads.ini

EXPOSE 9000
CMD ["php-fpm"]
