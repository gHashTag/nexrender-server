#!/bin/bash

# Скрипт для очистки репозитория от временных файлов

echo "🧹 Очистка репозитория nexrender-server..."

# Остановка всех процессов nexrender
echo "⏹️  Остановка процессов nexrender..."
pkill -f "nexrender" 2>/dev/null || true
pkill -f "aerender" 2>/dev/null || true

# Удаление временных файлов
echo "🗑️  Удаление temp/ папки..."
rm -rf temp/

echo "🗑️  Удаление output/ папки..."
rm -rf output/

# Удаление временных файлов из git index
echo "📋 Удаление из git индекса..."
git rm -r --cached temp/ 2>/dev/null || true
git rm -r --cached output/ 2>/dev/null || true
git rm --cached *.mp4 2>/dev/null || true
git rm --cached *.mp3 2>/dev/null || true
git rm --cached *.wav 2>/dev/null || true
git rm --cached *.jpg 2>/dev/null || true
git rm --cached *.png 2>/dev/null || true

# Создание необходимых папок
echo "📁 Создание структуры папок..."
mkdir -p temp
mkdir -p output

# Создание .gitkeep файлов
echo "# Эта папка нужна для временных файлов рендеринга" > temp/.gitkeep
echo "# Эта папка для готовых видео" > output/.gitkeep

echo "✅ Очистка завершена!"
echo ""
echo "📝 Следующие шаги:"
echo "1. git add ."
echo "2. git commit -m 'chore: cleanup temporary files and update .gitignore'"
echo "3. git push"
echo ""
echo "💾 Размер репозитория уменьшится на ~575MB" 