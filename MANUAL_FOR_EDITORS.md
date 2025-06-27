> Полное руководство по настройке, подготовке ассетов и запуску автоматического рендеринга видео с помощью After Effects

🔧 Предварительная настройка

Системные требования

Adobe After Effects 2025 (или версия, указанная в package.json)
Node.js (версия 18+)
npm (менеджер пакетов)

Установка зависимостей

# Установка зависимостей

npm install

Настройка переменных окружения

Создайте файл .env в корне проекта:

# Порт для Nexrender сервера

NEXRENDER_PORT=3000

# Секретный ключ для API

NEXRENDER_SECRET=myapisecret

# API ключ ElevenLabs (если используется синтез речи)

ELEVENLABS_API_KEY=your_elevenlabs_api_key

---

🚀 Запуск проекта

Быстрый запуск (рекомендуется)

# В одном терминале - запуск сервера и воркера одновременно

npm run dev

Пошаговый запуск

# Терминал 1 - API сервер

npm run dev:server

# Терминал 2 - Воркер для рендеринга

npm run dev:worker

# Терминал 3 - Запуск задания на рендер

npm run start:render

---

📁 Структура шаблонов

Все шаблоны находятся в папке src/template/. Каждый шаблон имеет следующую структуру:

src/template/
├── neuronews/ # Простой новостной шаблон
│ ├── Assets/ # Папка с ассетами
│ ├── news.aep # After Effects проект
│ └── config.ts # Конфигурация шаблона
├── riddle/ # Шаблон для загадок
├── slideshow01/ # Слайдшоу с множественными изображениями
│ ├── Assets/ # 25+ изображений + аудио
│ ├── Project/ # AE проекты
│ └── config.ts # Конфигурация
└── slideshow02-05/ # Другие варианты слайдшоу

Типы ассетов в шаблонах

1. Видео ассеты

videos: [
{
layerName: "Video_01", // Имя слоя в AE
path: "путь/к/видео.mp4", // Путь к файлу
composition: "Instagram_Story", // Композиция (опционально)
},
];

2. Изображения

images: [
{
layerName: "Photo_01",
path: "путь/к/изображению.png",
composition: "Instagram_Story",
},
];

3. Аудио

audio: [
{
layerName: "Audio_01",
path: "путь/к/аудио.mp3",
},
];

4. Текстовые элементы

text: [
{
layerName: "Text_02", // Имя текстового слоя в AE
property: "Source Text", // Свойство для изменения
defaultValue: "Текст по умолчанию",
composition: "Text_02", // Композиция
},
];

---

🎨 Подготовка ассетов

Требования к файлам

Изображения

Форматы: PNG, JPG
Разрешение: Рекомендуется 1080x1920 для Instagram Stories
Именование: Используйте понятные имена или числовую последовательность (01.jpg, 02.jpg)

Видео

Форматы: MP4, MOV
Кодек: H.264
Разрешение: 1080x1920 для вертикальных видео

Аудио

Форматы: MP3, WAV
Качество: 128-320 kbps
Длительность: Соответствующая длительности видео

Структура папки Assets

Для простых шаблонов (neuronews, riddle):

Assets/
├── news.mp3 # Основное аудио
├── cover01.png # Главное изображение
├── bg-video01.mp4 # Фоновые видео
├── bg-video02.mp4
├── bg-video03.mp4
├── bg-video04.mp4
└── sourceVideoPath.mp4 # Основное видео

Для слайдшоу (slideshow01):

Assets/
├── 01.jpg # Изображения слайдов
├── 02.jpg # (нумерация от 01 до 25+)
├── ...
├── 25.jpg
└── audio1.mp3 # Фоновая музыка

---

🔨 Создание новых шаблонов

Шаг 1: Создание структуры папок

mkdir src/template/my_template
mkdir src/template/my_template/Assets

Шаг 2: Размещение AE проекта

Скопируйте ваш .aep файл в папку шаблона:

src/template/my_template/my_template.aep

Шаг 3: Создание конфигурации

Создайте файл config.ts:

import { join } from "path";
import { TemplateAssets, TemplateConfig } from "../../types/template.types";
import { CONFIG } from "../../config/constants";

const TEMPLATE_NAME = "my_template";

const TEMPLATE_CONFIG = {
name: TEMPLATE_NAME,
composition: "Main", // Имя основной композиции в AE
paths: {
template: join(
CONFIG.paths.base,
"src",
CONFIG.paths.templates,
TEMPLATE_NAME
),
assets: "Assets",
},
};

export const config: TemplateConfig = {
name: TEMPLATE_CONFIG.name,
composition: TEMPLATE_CONFIG.composition,
outputModule: "H.264 - Match Render Settings - 15 Mbps",
outputExt: "mp4",
settingsTemplate: "Best Settings",
aepPath: join(TEMPLATE_CONFIG.paths.template, `${TEMPLATE_NAME}.aep`),
};

const assetsDir = join(
TEMPLATE_CONFIG.paths.template,
TEMPLATE_CONFIG.paths.assets
);

export const assets: TemplateAssets = {
videos: [
{
layerName: "MainVideo",
path: join(assetsDir, "main_video.mp4"),
},
],
images: [
{
layerName: "BackgroundImage",
path: join(assetsDir, "background.png"),
composition: "Main",
},
],
audio: [
{
layerName: "BackgroundAudio",
path: join(assetsDir, "background_music.mp3"),
},
],
text: [
{
layerName: "TitleText",
property: "Source Text",
defaultValue: "Заголовок по умолчанию",
composition: "Main",
},
],
};

Шаг 4: Подготовка After Effects проекта

В After Effects:

Именование слоев: Дайте слоям понятные имена, соответствующие layerName в конфигурации
Структура композиций: Убедитесь, что композиции имеют правильные имена
Настройки рендера: Настройте Output Module и Render Settings

Ключевые моменты:

Слои должны быть заблокированы или скрыты, если не нужны для замены
Используйте композиции для группировки связанных элементов
Установите правильную длительность композиции

---

🎯 Запуск рендеринга

🔄 Смена активного шаблона (ВАЖНО!)

Перед запуском рендеринга обязательно выберите нужный шаблон.

#### Доступные шаблоны:

neuronews - Простой новостной шаблон с текстом и видео
riddle - Шаблон для загадок с интерактивными элементами
slideshow01 - Мультиэкранное слайдшоу (25+ изображений)
slideshow02 - Мягкое слайдшоу с переходами
slideshow03 - Слайдшоу с частицами и эффектами
slideshow04 - Динамичное слайдшоу
slideshow05 - Футуристичное слайдшоу с opener

#### Как сменить шаблон:

Шаг 1: Откройте файл src/main.ts

Шаг 2: Найдите строку (около 11-й строки):

const templateName = "riddle"; // Текущий активный шаблон

Шаг 3: Замените на нужный шаблон:

// Примеры смены шаблона:
const templateName = "neuronews"; // Для новостей
const templateName = "slideshow01"; // Для слайдшоу
const templateName = "riddle"; // Для загадок

Шаг 4: Сохраните файл (Ctrl+S / Cmd+S)

Варианты запуска

#### 1. Через скрипт (рекомендуется)

pnpm run start:render

#### 2. Через API (для автоматизации)

# Создание задания рендеринга через API

curl -X POST http://localhost:3000/api/v1/jobs \
 -H "Content-Type: application/json" \
 -H "nexrender-secret: myapisecret" \
 -d '{
"template": {
"name": "slideshow01",
"src": "file:///path/to/slideshow01.aep",
"composition": "Render"
},
"assets": [
{
"type": "image",
"src": "file:///path/to/image.jpg",
"layerName": "media_01"
}
]
}'

#### 3. Программный запуск

Создайте скрипт для пакетного рендеринга:

// batch-render.js
const templates = ["neuronews", "riddle", "slideshow01"];

for (const template of templates) {
console.log(`Рендеринг шаблона: ${template}`);
// Измените templateName в main.ts
// Запустите рендеринг
}

📊 Мониторинг прогресса

Система автоматически отслеживает прогресс рендеринга и выводит в консоль:

# Пример вывода в консоли:

Проверка сервера...
Сервер доступен

Создание задания...
Задание создано

Отправка задания на сервер...
Задание принято, ID: abc123def456

[18:30:45] Статус: started, Прогресс: 0%
[18:30:50] Статус: started, Прогресс: 15%
[18:31:00] Статус: started, Прогресс: 50%
[18:31:15] Статус: started, Прогресс: 85%
[18:31:20] Статус: finished, Прогресс: 100%

Рендеринг успешно завершен!
Результат доступен в: /path/to/output/riddle.mp4
Файл успешно создан!

Статусы рендеринга:

started - Рендеринг начат, идет обработка
finished - Рендеринг завершен успешно
error - Произошла ошибка (см. детали в логах)

📁 Результат

Готовое видео сохраняется в папку output/
Имя файла: {templateName}.mp4
Пример: output/slideshow01.mp4

🔄 Быстрая смена и перезапуск

Для смены шаблона без перезапуска сервера:

Измените templateName в src/main.ts
Сохраните файл
Запустите в новом терминале:

npm run start:render

Новый рендер начнется с выбранным шаблоном

Важно: Сервер остается запущенным! Менять нужно только шаблон в коде.

🔍 Решение проблем

Частые ошибки

1. "AEP file not found"

Причина: Неверный путь к файлу After Effects
Решение:

Проверьте путь в config.ts
Убедитесь, что файл .aep существует

2. "Asset file not found"

Причина: Отсутствует файл ассета
Решение:

Проверьте наличие всех файлов в папке Assets/
Убедитесь в правильности путей в конфигурации

3. "Server unavailable"

Причина: Не запущен сервер или воркер
Решение:

# Остановите все процессы и перезапустите

pnpm run dev

#### 4. "Composition not found"

Причина: Неверное имя композиции
Решение:

Проверьте имя композиции в After Effects
Убедитесь, что оно соответствует конфигурации

Логи и отладка

#### Просмотр логов сервера

Логи выводятся в консоль при запуске pnpm run dev

#### Проверка статуса задания

curl -H "nexrender-secret: myapisecret" \
 http://localhost:3000/api/v1/jobs/{JOB_ID}

#### Временные файлы

Временные файлы рендеринга находятся в папке temp/

---

📝 Чек-лист для монтажера

Перед началом работы:

After Effects установлен и активирован
Все зависимости установлены (npm install)
Файл .env настроен
Сервер и воркер запущены (npm run dev)

При создании нового шаблона:

Создана структура папок
AE проект размещен в правильной папке
Слои в AE имеют понятные имена
Создан файл config.ts
Все ассеты размещены в папке Assets/
Пути в конфигурации соответствуют реальным файлам

При запуске рендеринга:

Выбран правильный шаблон в main.ts
Все файлы ассетов существуют
Сервер отвечает на запросы
Мониторинг прогресса активен

---

🎓 Дополнительные ресурсы

Документация Nexrender
After Effects Expression Reference
Примеры шаблонов в папке

---

Создано для команды монтажеров. Версия 1.0
