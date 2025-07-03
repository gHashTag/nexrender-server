# 🖥️ Развертывание Adobe After Effects на AWS Windows EC2

## 🕉️ Мудрость: "स्थितप्रज्ञस्य का भाषा" - "Каков язык мудрого?"

## 🎯 Архитектура

```
Frontend → AWS EC2 Windows → Adobe After Effects → Nexrender → Video Output
                ↓
            Remote Desktop (RDP)
```

## 🚀 План Развертывания

### Этап 1: Создание Windows EC2 Instance

1. **AWS Console** → EC2 → Launch Instance
2. **AMI**: Windows Server 2022 Base
3. **Instance Type**: t3.large (минимум 2 vCPU, 8GB RAM)
4. **Storage**: 100GB GP3 SSD
5. **Security Groups**: 
   - RDP (3389) - ваш IP
   - HTTP (80) - 0.0.0.0/0
   - HTTPS (443) - 0.0.0.0/0
   - Custom (3000) - 0.0.0.0/0 (Nexrender)

### Этап 2: Настройка Windows Server

```powershell
# 1. Установка Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 2. Установка Node.js
choco install nodejs -y

# 3. Установка Git
choco install git -y

# 4. Установка Chrome (для загрузки AE)
choco install googlechrome -y
```

### Этап 3: Установка Adobe After Effects

1. **Через RDP** подключиться к Windows Server
2. **Скачать Adobe Creative Cloud**:
   - https://creativecloud.adobe.com/apps/download/creative-cloud
3. **Установить After Effects** через Creative Cloud
4. **Активировать лицензию** (нужна подписка Adobe)

### Этап 4: Настройка Nexrender

```powershell
# В Windows PowerShell
cd C:\
git clone https://github.com/gHashTag/nexrender-server.git
cd nexrender-server

# Установка зависимостей
npm install -g pnpm
pnpm install

# Настройка переменных окружения
$env:NEXRENDER_PORT = "3000"
$env:NEXRENDER_SECRET = "myapisecret"
$env:AERENDER_BINARY = "C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\aerender.exe"

# Запуск сервера
pnpm run dev:server
```

### Этап 5: Автозапуск как Windows Service

```powershell
# Установка node-windows
npm install -g node-windows

# Создание Windows Service
node scripts/install-windows-service.js
```

## 💰 Стоимость

- **t3.large Windows**: ~$50-70/месяц
- **Adobe Creative Cloud**: ~$50/месяц
- **Total**: ~$100-120/месяц

## 🔧 Преимущества

✅ **Полная совместимость** с After Effects  
✅ **Графический интерфейс** через RDP  
✅ **Стабильная работа** без эмуляции  
✅ **Легкая установка** плагинов и обновлений  

## ⚠️ Недостатки

❌ **Дороже** чем Railway  
❌ **Требует Windows Server лицензию**  
❌ **Нужна Adobe подписка**  
