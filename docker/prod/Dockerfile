# --- Stage 1: Node builder ---
FROM node:20-alpine AS node-builder
WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend source
COPY resources ./resources
COPY vite.config.* ./
COPY tsconfig*.json ./
COPY public ./public

# Build frontend (vytvoří public/build/)
RUN npm run build

# --- Stage 2: PHP 8.3 ---
FROM php:8.3-fpm-alpine
WORKDIR /var/www

# System deps + PHP extensions
RUN apk add --no-cache \
        libzip-dev unzip oniguruma-dev sqlite-dev bash git curl icu-dev \
        libpng-dev libjpeg-turbo-dev libwebp-dev freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo pdo_mysql pdo_sqlite bcmath zip intl gd

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Laravel app
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy built frontend do lokálního public/ mountu (pokud existuje)
# NEPŘEPISUJ storage, database ani .env!
COPY --from=node-builder /app/public/build ./public/build

# Permissions
RUN chown -R www-data:www-data bootstrap/cache storage public/build \
    && chmod -R 775 bootstrap/cache storage public/build

# PHP config
RUN echo "upload_max_filesize=50M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=55M" >> /usr/local/etc/php/conf.d/uploads.ini

# Entrypoint
COPY docker/prod/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm", "-F", "-R"]
