#!/bin/bash
set -euo pipefail

# ---- Barvy pro logy ----
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
NC='\033[0m'

info()    { echo -e "${CYAN}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✔️  $1${NC}"; }
warn()    { echo -e "${YELLOW}⚠️  $1${NC}"; }
error()   { echo -e "${RED}❌ $1${NC}"; exit 1; }

# ---- Kontrola Dockeru ----
docker info > /dev/null 2>&1 || error "Docker není spuštěný nebo není dostupný"

# ---- Kontrola .env.production ----
if [[ ! -f .env.production ]]; then
  error "Chybí .env.production! Deployment nelze provést."
fi
info ".env.production nalezen"

# ---- Pull latest code (optional, pokud běžíte na serveru) ----
if [[ -d .git ]]; then
  info "Pulluji nejnovější kód z gitu..."
  git pull || warn "Git pull selhal, pokračuji s lokálním kódem"
fi

# ---- Build Docker image (app) ----
info "Builduji Docker image pro app..."
docker compose -f docker-compose.yml build --pull --no-cache app
success "Docker image postaven"

# ---- Verify Vite build exists in image ----
info "Ověřuji Vite build v image..."
if docker compose -f docker-compose.yml run --rm app test -f /var/www/public/build/manifest.json; then
  success "Vite build manifest nalezen v image"
else
  error "Vite build manifest CHYBÍ v image! Build selhal."
fi

# ---- Stop old containers gracefully ----
info "Zastavuji staré kontejnery..."
docker compose -f docker-compose.yml down || true

# ---- Spuštění služeb ----
info "Spouštím kontejnery (app + nginx)..."
docker compose -f docker-compose.yml up -d app nginx
success "Kontejnery běží"

# ---- Wait for app to be ready ----
info "Čekám na start PHP-FPM (5s)..."
sleep 5

# ---- Check if containers are running ----
if ! docker compose -f docker-compose.yml ps | grep -q "Up"; then
  error "Kontejnery neběží! Zkontrolujte logy: docker compose logs"
fi

# ---- Laravel optimalizace ----
info "Optimalizuji Laravel cache..."
docker compose -f docker-compose.yml exec -T app bash -c "
  php artisan config:clear &&
  php artisan cache:clear &&
  php artisan view:clear &&
  php artisan route:clear &&
  php artisan config:cache &&
  php artisan route:cache &&
  php artisan view:cache
" || error "Laravel cache optimalizace selhala"
success "Laravel cache optimalizována"

# ---- Migrace databáze ----
info "Spouštím migrace..."
docker compose -f docker-compose.yml exec -T app php artisan migrate --force || error "Migrace selhaly"
success "Migrace hotové"

# ---- Verify storage permissions ----
info "Kontroluji práva na storage..."
docker compose -f docker-compose.yml exec -T app chown -R www-data:www-data storage bootstrap/cache || true

# ---- Health check ----
APP_URL=$(grep -E '^APP_URL=' .env.production | cut -d '=' -f2)
info "Testuji dostupnost aplikace na $APP_URL ..."

# Počkej chvíli, než se aplikace probudí
sleep 3

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL" || true)

if [[ "$STATUS" =~ ^2 ]]; then
  success "✅ Aplikace dostupná: $APP_URL (HTTP $STATUS)"
elif [[ "$STATUS" =~ ^3 ]]; then
  success "✅ Aplikace přesměrovává: $APP_URL (HTTP $STATUS)"
else
  warn "⚠️  Aplikace vrací neočekávaný stav: HTTP $STATUS"
  warn "Zkontrolujte logy: docker compose logs -f app nginx"
  
  # Zobraz posledních 20 řádků logů
  info "Posledních 20 řádků z app logů:"
  docker compose -f docker-compose.yml logs --tail=20 app
fi

# ---- Summary ----
echo ""
success "🚀 Deployment dokončen!"
info "URL: $APP_URL"
info "Sledování logů: docker compose logs -f"
info "Status: docker compose ps"