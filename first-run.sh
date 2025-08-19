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

# ---- .env ----
if [[ ! -f .env ]]; then
  [[ -f .env.production ]] || error "Chybí .env.production"
  cp .env.production .env
  success ".env zkopírován"
else
  info ".env existuje, kopírování přeskočeno"
fi

# ---- Git update ----
if [ -d ".git" ]; then
  info "Aktualizuji repozitář..."
  git fetch --all --prune
  git reset --hard origin/main
  success "Repozitář aktualizován"
else
  warn "Adresář není git repozitář. Aktualizace přeskočena."
fi

# ---- NPM build jen pokud změna ----
if [ ! -f node_modules ] || [ node_modules/* -nt public/build/* ]; then
  info "Build frontend..."
  docker compose run --rm node sh -c "npm install && npm run build"
  success "Frontend build hotov"
else
  info "Frontend build aktuální, přeskočeno"
fi

# ---- Docker build ----
info "Builduji Docker image..."
docker compose -f docker-compose.yml build --no-cache app
success "Docker image hotov"

# ---- Start kontejnerů ----
docker compose -f docker-compose.yml up -d --force-recreate
success "Kontejnery spuštěny"

# ---- Optimalizace Laravel cache ----
info "Optimalizuji Laravel cache..."
docker compose -f docker-compose.yml exec app bash -c "
  php artisan optimize:clear &&
  php artisan optimize
"
success "Cache optimalizována"

# ---- Migrace jen pokud je potřeba ----
info "Kontroluji migrace..."
PENDING=$(docker compose -f docker-compose.yml exec app php artisan migrate:status --no-ansi | grep 'No' || true)
if [ -n "$PENDING" ]; then
  docker compose -f docker-compose.yml exec app php artisan migrate --force
  success "Migrace dokončeny"
else
  info "Žádné nové migrace, přeskočeno"
fi

# ---- Test dostupnosti ----
SERVER_IP=$(hostname -I | awk '{print $1}')
if curl -I --max-time 10 http://$SERVER_IP 2>/dev/null | grep "HTTP/" >/dev/null; then
  success "Aplikace dostupná: http://$SERVER_IP"
else
  error "Nelze se připojit k aplikaci"
fi
