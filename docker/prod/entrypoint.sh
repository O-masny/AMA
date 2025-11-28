#!/bin/bash
set -e

cd /var/www

# Vytvoření potřebných složek s oprávněními
mkdir -p bootstrap/cache storage/framework/{sessions,views,cache}
chmod -R 775 bootstrap/cache storage
chown -R www-data:www-data bootstrap/cache storage

# Kontrola existence Vite manifest.json
if [ ! -f public/build/manifest.json ]; then
  echo "[ERROR] Missing Vite manifest.json in /var/www/public/build"
  exit 1
fi

echo "🧹 Laravel cache clear..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

echo "📦 Laravel cache build..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "🚀 Starting php-fpm..."
exec "$@"
