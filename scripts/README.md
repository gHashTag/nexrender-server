# Scripts для Nexrender Server

## Доступные скрипты

### `cleanup-repo.sh` - Очистка репозитория

Удаляет временные файлы и освобождает место в репозитории.

```bash
bash scripts/cleanup-repo.sh
```

**Что делает:**

- Останавливает все процессы nexrender
- Удаляет папки `temp/` и `output/`
- Удаляет медиафайлы из git index
- Создает пустые папки с .gitkeep файлами

**После запуска выполните:**

```bash
git add .
git commit -m "chore: cleanup temporary files"
git push
```

## Добавление новых скриптов

При создании новых скриптов:

1. Сделайте файл исполняемым: `chmod +x scripts/your-script.sh`
2. Добавьте описание в этот README
3. Используйте четкие комментарии в коде

## Требования

- Bash
- Git
- Права на выполнение команд `pkill`
