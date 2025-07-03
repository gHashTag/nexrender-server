#!/bin/bash

# 🕉️ Остановка Ubuntu Desktop с VNC
# "अन्तं न जानामि" - "Я не знаю конца"

set -e

echo "🕉️ Останавливаю Ubuntu Desktop..."
echo "================================"

# Останавливаем и удаляем контейнеры
docker-compose -f docker-compose.ubuntu-desktop.yml down

echo ""
echo "✅ Ubuntu Desktop остановлен"
echo ""
echo "💾 Wine данные сохранены в Docker volume 'wine_data'"
echo "📁 Файлы рендера сохранены в ./renders"
echo "📊 Логи сохранены в ./logs"
