#!/bin/bash
set -e  # Skript bricht ab, sobald ein Befehl fehlschlägt

PROJECT_DIR="/opt/miluph-website"
WEB_DIR="/var/www/miluph-website"

echo "→ Wechsle ins Projektverzeichnis..."
cd "$PROJECT_DIR"

echo "→ Baue die Seite..."
npm run build

echo "→ Synce dist/ nach $WEB_DIR ..."
sudo rsync -a --delete dist/ "$WEB_DIR/"

echo "→ Setze Berechtigungen..."
sudo chown -R www-data:www-data "$WEB_DIR"

echo "✓ Fertig! Live unter https://miluph.cp.physik.uni-tuebingen.de"
