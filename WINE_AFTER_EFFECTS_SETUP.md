# 🍷 Установка Adobe After Effects через Wine на Railway

## 🕉️ Мудрость: "विनयेन् तु शुध्यति" - "Через смирение происходит очищение"

## 📋 Обзор Подхода

Этот подход использует Wine (Wine Is Not an Emulator) для запуска Adobe After Effects на Linux в Railway облаке.

### ⚠️ Важные Ограничения

1. **Производительность**: Wine эмуляция медленнее нативного Windows
2. **Совместимость**: Не все функции After Effects могут работать
3. **Ресурсы**: Требует больше RAM и CPU
4. **Стабильность**: Возможны крэши и ошибки

## 🚀 Развертывание

### 1. Коммит изменений
```bash
git add .
git commit -m "🍷 feat: Add Wine + After Effects support for Railway"
git push
```

### 2. Развертывание на Railway
```bash
railway up --detach
```

### 3. Настройка переменных окружения через Railway Dashboard
```bash
# Перейти в Railway Dashboard и добавить:
NEXRENDER_SECRET=myapisecret
ELEVENLABS_API_KEY=your_key_here
NODE_ENV=production
```

## 🖥️ Доступ к Удаленному Рабочему Столу

После развертывания:

1. **VNC подключение**: Порт 5900, пароль: `railway`
2. **Использовать VNC клиент** (например, RealVNC Viewer, TightVNC)
3. **Адрес**: `your-railway-app.railway.app:5900`

## 📦 Установка After Effects в Wine

### Через VNC:

1. **Подключиться к VNC**
2. **Открыть терминал** в Fluxbox
3. **Скачать Creative Cloud**:
   ```bash
   wget https://ccmdl.adobe.com/AdobeProducts/KCCC/CCD/5_6_0_554/win64/ACCCx64.zip
   unzip ACCCx64.zip
   wine setup.exe
   ```

### Альтернативный способ - через Dockerfile:

Добавить в `Dockerfile.wine` перед CMD:

```dockerfile
# Download and install Creative Cloud (потребует лицензии)
RUN wget -O /tmp/cc.zip "https://ccmdl.adobe.com/AdobeProducts/KCCC/CCD/5_6_0_554/win64/ACCCx64.zip" \
    && unzip /tmp/cc.zip -d /tmp/cc \
    && wine /tmp/cc/setup.exe /S \
    && rm -rf /tmp/cc*
```

## 🎯 После Установки

### 1. Настройка After Effects для Nexrender
```bash
# В Wine терминале
wine "C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\aerender.exe" -help
```

### 2. Обновление переменных окружения
```bash
# Через Railway CLI или Dashboard
railway variables --set "AERENDER_BINARY=/app/.wine/drive_c/Program Files/Adobe/Adobe After Effects 2024/Support Files/aerender.exe"
```

### 3. Тестирование
```bash
curl -H "nexrender-secret: myapisecret" \
  https://your-app.railway.app/api/v1/jobs
```

## 🔧 Отладка

### Логи:
```bash
# Через Railway CLI
railway logs

# Или в контейнере:
tail -f /app/logs/*.log
```

### Проверка Wine:
```bash
# В VNC терминале
wine --version
winetricks list-installed
```

## 💡 Альтернативные Решения

Если Wine не работает стабильно:

1. **AWS EC2 Windows**: Более надежно, но дороже
2. **Azure Virtual Desktop**: Специализированное решение
3. **Paperspace**: GPU-ускоренные виртуальные машины

## 📚 Полезные Ссылки

- [Wine Application Database](https://appdb.winehq.org/)
- [Winetricks Commands](https://github.com/Winetricks/winetricks)
- [Adobe Creative Cloud System Requirements](https://helpx.adobe.com/creative-cloud/system-requirements.html)

---

*Ом Шанти. Пусть путь через эмуляцию приведет к творческой свободе.* 🙏
