#!/bin/bash

# 🕉️ Запуск Ubuntu Desktop с VNC для Adobe After Effects
# "वृक्षस्य मूलानि संस्कृतिः" - "Корни дерева - это его культура"

set -e

echo "🕉️ Запускаю Ubuntu Desktop с VNC и Wine..."
echo "=========================================="

# Создаем необходимые директории
mkdir -p renders logs

# Проверяем, что Docker запущен
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker не запущен. Пожалуйста, запустите Docker Desktop."
    exit 1
fi

# Останавливаем существующий контейнер, если он запущен
echo "🔄 Останавливаю существующие контейнеры..."
docker-compose -f docker-compose.ubuntu-desktop.yml down || true

# Собираем образ (если нужно)
echo "🔨 Собираю Docker образ..."
docker-compose -f docker-compose.ubuntu-desktop.yml build

# Запускаем контейнер
echo "🚀 Запускаю Ubuntu Desktop..."
docker-compose -f docker-compose.ubuntu-desktop.yml up -d

# Ждем запуска сервисов
echo "⏳ Ожидаю запуска сервисов..."
sleep 10

# Проверяем статус
echo "📊 Статус контейнера:"
docker-compose -f docker-compose.ubuntu-desktop.yml ps

echo ""
echo "✅ Ubuntu Desktop успешно запущен!"
echo ""
echo "🖥️  Доступ к рабочему столу:"
echo "    VNC:     localhost:5901 (пароль: railway)"
echo "    Web VNC: http://localhost:6080/vnc.html"
echo ""
echo "🚀 Nexrender API: http://localhost:3000"
echo ""
echo "📁 Монтированные папки:"
echo "    ./renders - для готовых видео"
echo "    ./logs    - логи сервера"
echo ""
echo "🔧 Полезные команды:"
echo "    ./scripts/stop-ubuntu-desktop.sh  - остановить"
echo "    ./scripts/logs-ubuntu-desktop.sh  - просмотр логов"
echo "    docker exec -it nexrender-ubuntu-desktop bash - войти в контейнер"
echo ""
echo "🍷 Wine будет доступен в VNC сессии для установки Adobe After Effects"
