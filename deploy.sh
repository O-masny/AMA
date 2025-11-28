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

# ---- Git pull (optional) ----
if [[ -d .git ]]; then
  info "Pulluji nejnovější kód z gitu..."
  git pull || warn "Git pull selhal, pokračuji s lokálním kódem"
fi

# ---- Build Docker image ----
info "Builduji Docker image..."
docker compose build --no-cache app

success "Docker image postaven"

# ---- Ověř manifest v image ----
info "Ověřuji Vite manifest v image..."
MANIFEST_CHECK=$(docker compose run --rm app sh -c '
  if [ -f /var/www/public/build/manifest.json ]; then
    echo "root"
  elif [ -f /var/www/public/build/.vite/manifest.json ]; then
    echo "vite"
  else
    echo "none"
  fi
' 2>/dev/null | tail -1)

if [[ "$MANIFEST_CHECK" == "root" ]]; then
  success "✅ Vite manifest nalezen v public/build/manifest.json"
elif [[ "$MANIFEST_CHECK" == "vite" ]]; then
  success "✅ Vite manifest nalezen v public/build/.vite/manifest.json"
else
  error "❌ Vite manifest CHYBÍ! Build selhal."
fi

# ---- Stop old containers ----
info "Zastavuji staré kontejnery..."
docker compose down --remove-orphans

# ---- Start services ----
info "Spouštím kontejnery..."
docker compose up -d app nginx
success "Kontejnery běží"

# ---- Wait for startup ----
info "Čekám na start služeb (5s)..."
sleep 5

# ---- Storage link (důležité pro Filament uploads!) ----
info "Vytvářím symlink public/storage -> storage/app/public..."
docker compose exec -T app php artisan storage:link || warn "Symlink už existuje"

# ---- Laravel optimalizace ----
info "Optimalizuji Laravel cache..."
docker compose exec -T app bash -c "
  php artisan config:clear &&
  php artisan cache:clear &&
  php artisan view:clear &&
  php artisan route:clear &&
  php artisan config:cache &&
  php artisan route:cache &&
  php artisan view:cache
" || error "Laravel cache optimalizace selhala"
success "Laravel cache optimalizována"

# ---- Migrace ----
info "Spouštím migrace..."
docker compose exec -T app php artisan migrate --force || error "Migrace selhaly"
success "Migrace hotové"

# ---- Storage permissions (důležité pro Filament!) ----
info "Kontroluji práva storage..."
docker compose exec -T app chown -R www-data:www-data storage bootstrap/cache || true
docker compose exec -T app chmod -R 775 storage || true

# ---- Health check ----
APP_URL=$(grep -E '^APP_URL=' .env.production | cut -d '=' -f2)
info "Testuji aplikaci na $APP_URL ..."
sleep 3

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL" || true)

if [[ "$STATUS" == "200" ]]; then
  success "🎉 Aplikace dostupná: $APP_URL (HTTP $STATUS)"
elif [[ "$STATUS" =~ ^3 ]]; then
  success "✅ Aplikace přesměrovává: $APP_URL (HTTP $STATUS)"
else
  warn "⚠️  Neočekávaný HTTP status: $STATUS"
  info "Poslední logy:"
  docker compose logs --tail=30 app
fi

# ---- Summary ----
echo ""
success "🚀 Deployment dokončen!"
info "URL: $APP_URL"
info "Logy: docker compose logs -f"
info "Status: docker compose ps"
info ""
info "📦 Perzistentní data:"
info "  - storage_data (Filament uploads)"
info "  - database_data (SQLite)"