# Base image s PHP 8.2 a FPM
FROM php:8.2-fpm

# Nastavení pracovního adresáře
WORKDIR /var/www

# Instalace systémových závislostí
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    && docker-php-ext-install pdo pdo_sqlite bcmath

# Instalace Composeru
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Kopírování aplikace
COPY . .

# Instalace PHP závislostí
RUN composer install --optimize-autoloader --no-dev

# Nastavení oprávnění složek pro Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Exponování portu 9000 pro FPM
EXPOSE 9000

# Spuštění PHP-FPM
CMD ["php-fpm"]
