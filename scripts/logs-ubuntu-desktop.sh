#!/bin/bash

# 🕉️ Просмотр логов Ubuntu Desktop
# "ज्ञानं बन्धात् विमोचनम्" - "Знание освобождает от оков"

echo "🕉️ Логи Ubuntu Desktop с VNC..."
echo "==============================="

# Показываем логи контейнера
docker-compose -f docker-compose.ubuntu-desktop.yml logs -f ubuntu-desktop
