#!/bin/bash
set -euo pipefail

# ---- Barvy pro logy ----
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
NC='\033[0m' # No Color

info()    { echo -e "${CYAN}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✔️  $1${NC}"; }
warn()    { echo -e "${YELLOW}⚠️  $1${NC}"; }
error()   { echo -e "${RED}❌ $1${NC}"; exit 1; }

# ---- Kontrola Dockeru ----
if ! docker info > /dev/null 2>&1; then
  error "Docker není spuštěný. Spusť ho a zkus znovu."
fi

# ---- Kontrola .env ----
[[ -f .env.production ]] || error "Chybí .env.production soubor."
cp .env.production .env
success ".env.production zkopírován do .env"

# ---- Aktualizace kódu ----
if [ -d ".git" ]; then
  info "Aktualizuji repozitář..."
  git fetch --all --prune
  git reset --hard origin/main
  success "Repozitář aktualizován"
else
  warn "Adresář není git repozitář. Aktualizace přeskočena."
fi

# ---- NPM build (pokud používáš frontend) ----
info "Spouštím frontend build v Node 20 containeru..."
docker compose run --rm node sh -c "
  npm install &&
  npm run build
"
success "Frontend build hotov"
# ---- Build Docker image ----
info "Builduji Docker image bez cache..."
docker compose -f docker-compose.yml build --no-cache app
success "Docker image hotov"

# ---- Start kontejnerů ----
info "Spouštím kontejnery..."
docker compose -f docker-compose.yml up -d --force-recreate
success "Kontejnery spuštěny"

# ---- Čekání na spuštění aplikace ----
info "Čekám na spuštění aplikace..."
until docker compose -f docker-compose.yml exec -T app curl -s http://localhost > /dev/null; do
  sleep 1
done
success "Aplikační kontejner je připraven."

# ---- Optimalizace Laravel cache ----
info "Optimalizuji Laravel cache..."
docker compose -f docker-compose.yml exec -T app bash -c "
  php artisan config:clear &&
  php artisan route:clear &&
  php artisan view:clear &&
  php artisan config:cache &&
  php artisan route:cache &&
  php artisan view:cache
"
success "Cache optimalizována"

# ---- Migrace databáze ----
info "Spouštím migrace (force)..."
docker compose -f docker-compose.yml exec -T app php artisan migrate --force
success "Migrace dokončeny"

# ---- Výpis stavu kontejnerů ----
docker compose -f docker-compose.yml ps

# ---- Test dostupnosti ----
SERVER_IP=$(hostname -I | awk '{print $1}')
info "Testuji dostupnost aplikace..."
if curl -I --max-time 10 http://$SERVER_IP 2>/dev/null | grep "HTTP/" >/dev/null; then
  success "Aplikace je dostupná: http://$SERVER_IP"
else
  error "Nelze se připojit k aplikaci."
fi
