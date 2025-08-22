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

# ---- Docker check ----
docker info > /dev/null 2>&1 || error "Docker není spuštěný"

# ---- Kontrola .env ----
if [[ ! -f .env.production ]]; then
  error "Chybí .env.production! Deployment nelze pokračovat."
fi
info ".env.production existuje, bude bindován do kontejneru"

# ---- Optional: Git kontrola (bez resetu) ----
if [ -d ".git" ]; then
  info "Aktuální commit: $(git rev-parse --short HEAD)"
else
  warn "Adresář není git repozitář. Git kontrola přeskočena."
fi

# ---- Frontend build přímo na host VPS ----
info "Build frontend přímo na VPS..."
npm ci
npm run build
success "Frontend build hotov"

# ---- Docker build backendu ----
info "Builduji Docker image backendu..."
docker compose -f docker-compose.yml build app
success "Docker image připraven"

# ---- Spuštění kontejnerů ----
info "Spouštím kontejnery..."
docker compose -f docker-compose.yml up -d
success "Kontejnery spuštěny"

# ---- Laravel optimalizace ----
info "Optimalizuji Laravel cache..."
docker compose -f docker-compose.yml exec -T app bash -c "
  php artisan config:cache &&
  php artisan route:cache &&
  php artisan view:cache
"
success "Laravel cache optimalizována"

# ---- Migrace databáze ----
info "Kontroluji migrace..."
PENDING=$(docker compose -f docker-compose.yml exec -T app php artisan migrate:status --no-ansi | grep 'No' || true)
if [ -n "$PENDING" ]; then
  docker compose -f docker-compose.yml exec -T app php artisan migrate --force
  success "Migrace dokončeny"
else
  info "Žádné nové migrace, přeskočeno"
fi

# ---- Test dostupnosti (externí URL) ----
APP_URL=$(grep -E '^APP_URL=' .env.production | cut -d '=' -f2)
if curl -I --max-time 10 "$APP_URL" 2>/dev/null | grep "HTTP/" >/dev/null; then
  success "Aplikace dostupná: $APP_URL"
else
  warn "Nelze se připojit k aplikaci přes $APP_URL, zkontrolujte Traefik a DNS"
fi
