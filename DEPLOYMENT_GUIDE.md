# 🚀 Руководство по развертыванию Nexrender Server

## 📦 Подготовка к развертыванию

### 1. Очистка репозитория

Перед развертыванием очистите репозиторий от временных файлов:

```bash
# Очистка одной командой
bash scripts/cleanup-repo.sh

# Коммит изменений
git add .
git commit -m "chore: cleanup temporary files and update .gitignore"
git push
```

### 2. Проверка .gitignore

Убедитесь, что следующие папки и файлы исключены:

```gitignore
# НЕ деплоить:
temp/                 # Временные файлы рендеринга
output/               # Готовые видео
*.mp4, *.mov         # Видеофайлы
*.mp3, *.wav         # Аудиофайлы (кроме ассетов шаблонов)
*.jpg, *.png         # Изображения (кроме ассетов шаблонов)
*auto-save*.aep      # Auto-save файлы After Effects
node_modules/        # Зависимости
.env                 # Переменные окружения

# ДЕПЛОИТЬ:
src/template/*/Assets/    # Ассеты шаблонов (важно!)
src/template/*/*.aep      # Основные AE проекты
src/template/*/config.ts  # Конфигурации шаблонов
src/                      # Исходный код
```

## 🌐 Настройка окружения

### Переменные окружения (.env)

```bash
# Основные настройки
NEXRENDER_PORT=3000
NEXRENDER_SECRET=your_secure_secret_here

# Дополнительные сервисы
ELEVENLABS_API_KEY=your_elevenlabs_key
```

### Системные требования

- **Node.js**: 18+
- **Adobe After Effects**: 2025+
- **RAM**: Минимум 8GB, рекомендуется 16GB+
- **Диск**: SSD, минимум 50GB свободного места

## 📁 Структура после развертывания

```
nexrender-server/
├── src/
│   ├── template/
│   │   ├── neuronews/
│   │   │   ├── Assets/          # ✅ Ассеты включены
│   │   │   ├── news.aep         # ✅ AE проект включен
│   │   │   └── config.ts        # ✅ Конфигурация включена
│   │   └── slideshow01/
│   │       ├── Assets/          # ✅ 25+ изображений включены
│   │       ├── Project/
│   │       └── config.ts
│   └── ... (остальной код)
├── temp/                        # ❌ Пустая (создается при запуске)
├── output/                      # ❌ Пустая (создается при запуске)
└── scripts/
    └── cleanup-repo.sh          # ✅ Скрипт очистки
```

## 🔧 Развертывание

### 1. На сервере

```bash
# Клонирование
git clone [repository-url]
cd nexrender-server

# Установка зависимостей
npm install

# Настройка окружения
cp env.example .env
# Отредактируйте .env

# Запуск
npm run dev
```

### 2. Docker (опционально)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## 💾 Управление дисковым пространством

### Автоматическая очистка

Добавьте в cron для регулярной очистки:

```bash
# Очистка каждый день в 2:00
0 2 * * * cd /path/to/nexrender-server && bash scripts/cleanup-repo.sh
```

### Мониторинг размера

```bash
# Проверка размера папок
du -sh temp/ output/

# Очистка старых файлов (старше 7 дней)
find temp/ -type f -mtime +7 -delete
find output/ -type f -mtime +7 -delete
```

## 🎯 После развертывания

### Тестирование

```bash
# Запуск тестового рендера
npm run start:render

# Проверка API
curl -H "nexrender-secret: your_secret" \
  http://localhost:3000/api/v1/jobs
```

### Мониторинг

- Логи: `tail -f *.log`
- Процессы: `ps aux | grep nexrender`
- Диск: `df -h`

## ⚠️ Важные замечания

1. **НЕ коммитьте** готовые видео и временные файлы
2. **Сохраняйте** ассеты шаблонов в git
3. **Регулярно очищайте** temp/ и output/ папки
4. **Мониторьте** дисковое пространство
5. **Используйте** правильные переменные окружения

## 🆘 Решение проблем

### Репозиторий слишком большой

```bash
# История git стала большой из-за медиафайлов
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch *.mp4 *.mp3 *.jpg *.png' \
  --prune-empty --tag-name-filter cat -- --all
```

### Недостаточно места на диске

```bash
# Экстренная очистка
rm -rf temp/* output/*
docker system prune -f  # Если используете Docker
```

---

_Соблюдение этих правил обеспечит стабильную работу и управляемый размер репозитория_ 🎯
