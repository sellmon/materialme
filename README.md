# Material Me

CLI для установки компонентов в ваш проект — по аналогии с [shadcn/ui](https://ui.shadcn.com).

Компоненты копируются в репозиторий (не ставятся как npm UI-пакет), с зависимостями и переписыванием импортов.

## Быстрый старт

В Next.js / React проекте с Tailwind CSS v4:

```bash
# Инициализация (components.json, lib/utils, тема)
npx materialme-cli@latest init

# Список компонентов
npx materialme-cli@latest list

# Установка
npx materialme-cli@latest add button
npx materialme-cli@latest add button badge icon
npx materialme-cli@latest add fade-in-top bar-chart
```

После `init` в проекте появится:

- `components.json` — конфиг (registry + aliases)
- `lib/utils.ts` — `cn()` helper
- `styles/materialme.css` — тема Material Me (подключается в ваш CSS)

## Категории

| Категория   | Описание                      | Пример            |
|------------|-------------------------------|-------------------|
| components | UI Material Design            | `button`, `dialog` |
| elements   | Базовые элементы              | `icon`, `checkbox` |
| anmt       | Анимации                      | `fade-in-top`     |
| charts     | Графики                       | `bar-chart`       |
| utils      | Утилиты / тема                | `utils`, `theme`  |

## Как это работает

1. CLI читает `registry.json` с GitHub:  
   `https://raw.githubusercontent.com/sellmon/materialme/main/registry.json`
2. Для каждого компонента скачивает исходники из  
   `packages/components/src/...`
3. Переписывает импорты под ваши aliases (`@/components`, `@/lib/utils`, …)
4. Ставит npm-зависимости компонента

Офлайн: в `components.json` укажите локальный `sourcePath` на `packages/components`.

## Конфигурация (`components.json`)

```json
{
  "aliases": {
    "utils": "@/lib/utils",
    "components": "@/components",
    "elements": "@/components/elements",
    "anmt": "@/components/anmt",
    "charts": "@/components/charts",
    "lib": "@/lib"
  },
  "registry": "https://raw.githubusercontent.com/sellmon/materialme/main/registry.json",
  "registryBaseUrl": "https://raw.githubusercontent.com/sellmon/materialme/main/packages/components"
}
```

Убедитесь, что в `tsconfig.json` есть:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Разработка монорепо

```bash
# Пересобрать registry.json из packages/components
pnpm build:registry

# Собрать CLI
pnpm build:cli

# Preview
cd preview && pnpm dev
```

```
materialme/
├── packages/cli/          # npm: materialme-cli (bin: materialme)
├── packages/components/   # исходники компонентов
├── registry.json          # индекс для CLI
├── scripts/               # sync + build-registry
└── preview/               # Next.js preview
```

## License

MIT
