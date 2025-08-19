FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Systémové závislosti
RUN apk add --no-cache \
    libzip-dev \
    unzip \
    oniguruma-dev \
    sqlite-dev \
    bash \
    git \
    curl \
    && docker-php-ext-install pdo pdo_sqlite bcmath zip

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Kopírování aplikace
COPY . .

# Composer dependencies (production)
RUN composer install --no-dev --optimize-autoloader

# Nastavení práv
RUN chown -R www-data:www-data storage bootstrap/cache database

EXPOSE 9000
CMD ["php-fpm"]
