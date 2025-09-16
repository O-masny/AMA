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

# ---- Build Docker image (app) ----
info "Builduji Docker image pro app..."
docker compose -f docker-compose.yml build --pull app
success "Docker image postaven"

# ---- Spuštění služeb ----
info "Spouštím kontejnery (app + nginx)..."
docker compose -f docker-compose.yml up -d app nginx
success "Kontejnery běží"

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
"
success "Laravel cache optimalizována"

# ---- Migrace databáze ----
info "Spouštím migrace..."
docker compose -f docker-compose.yml exec -T app php artisan migrate --force
success "Migrace hotové"

# ---- Health check ----
APP_URL=$(grep -E '^APP_URL=' .env.production | cut -d '=' -f2)
info "Testuji dostupnost aplikace na $APP_URL ..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL" || true)

if [[ "$STATUS" =~ ^2|3 ]]; then
  success "Aplikace dostupná: $APP_URL (HTTP $STATUS)"
else
  warn "Aplikace vrací neočekávaný stav: HTTP $STATUS"
fi
