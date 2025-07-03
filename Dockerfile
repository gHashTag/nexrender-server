# Используем Ubuntu base image с поддержкой графики
FROM ubuntu:22.04

# Устанавливаем необходимые зависимости
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    xvfb \
    x11vnc \
    fluxbox \
    wget \
    wmctrl \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Устанавливаем FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Копируем весь проект
COPY . .

# Компилируем TypeScript
RUN pnpm run build

# Создаем директории для вывода
RUN mkdir -p /app/output /app/temp

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV NEXRENDER_PORT=3000
ENV DISPLAY=:99

# Экспонируем порт
EXPOSE 3000

# Создаем скрипт запуска
RUN echo '#!/bin/bash\n\
# Запускаем виртуальный дисплей\n\
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &\n\
# Запускаем приложение\n\
node build/main/index.js' > /app/start.sh

RUN chmod +x /app/start.sh

# Запускаем приложение
CMD ["/app/start.sh"]
