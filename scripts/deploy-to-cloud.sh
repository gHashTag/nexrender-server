#!/bin/bash

# 🕉️ Облачное развертывание Ubuntu Desktop с VNC
# "आकाशगङ्गा पार गमनम्" - "Путешествие через млечный путь"

set -e

echo "🕉️ Подготовка к облачному развертыванию..."
echo "=========================================="

# Проверяем Git статус
echo "📊 Проверяю Git статус..."
git status --porcelain

if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Есть незафиксированные изменения. Фиксирую..."
    git add .
    git commit -m "🕉️ Auto-commit before cloud deployment"
    git push origin main
fi

echo ""
echo "✅ Проект готов к облачному развертыванию!"
echo ""
echo "🚀 Варианты развертывания:"
echo ""
echo "1️⃣  RAILWAY (Рекомендуется для быстрого старта):"
echo "   • Перейдите на: https://railway.app"
echo "   • Нажмите 'New Project'"
echo "   • Выберите 'Deploy from GitHub repo'"
echo "   • Выберите репозиторий: gHashTag/nexrender-server"
echo "   • Railway автоматически обнаружит Dockerfile.ubuntu-desktop"
echo ""
echo "2️⃣  AWS EC2 (Для production):"
echo "   • Создайте EC2 инстанс Ubuntu"
echo "   • Выполните команды из AWS_WINDOWS_DEPLOYMENT.md"
echo ""
echo "3️⃣  DigitalOcean Droplet:"
echo "   • Создайте Droplet с Docker"
echo "   • Клонируйте репозиторий и запустите docker-compose"
echo ""
echo "📝 Переменные окружения для облака:"
echo "   VNC_RESOLUTION=1920x1080"
echo "   VNC_PASSWORD=railway123"
echo "   DISPLAY=:1"
echo "   NODE_ENV=production"
echo "   PORT=3000"
echo ""
echo "🌐 После развертывания будут доступны:"
echo "   • Web VNC: https://your-app.railway.app (порт 6080)"
echo "   • Nexrender API: https://your-app.railway.app (порт 3000)"
echo "   • VNC Client: your-app.railway.app:5901"
echo ""
echo "📖 Полная документация: CLOUD_DEPLOYMENT.md"
echo ""

# Открываем Railway в браузере (если доступно)
if command -v open >/dev/null 2>&1; then
    echo "🌐 Открываю Railway в браузере..."
    open "https://railway.app"
elif command -v xdg-open >/dev/null 2>&1; then
    echo "🌐 Открываю Railway в браузере..."
    xdg-open "https://railway.app"
fi

echo "🕉️ Готово! Следуйте инструкциям выше для развертывания."
