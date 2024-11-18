# nexrender-server

nexrender app

### В одном терминале запускаем сервер и воркер:

```bash
pnpm run dev
```

В другом терминале запускаем рендер:

```bash
pnpm run start:render
```

Или, если хотите запускать по отдельности:

```bash
# Терминал 1
pnpm run start:server

# Терминал 2
pnpm run start:worker

# Терминал 3
pnpm run start:render
```
