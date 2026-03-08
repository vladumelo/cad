# CAD MVP: Metal + Plywood Parametric Constructor

## Архитектура

Слои приложения:

1. **Product templates** (`src/data/templates.ts`) — стартовые шаблоны изделий.
2. **Parametric engine** (`src/lib/parametric`) — детерминированная генерация деталей и 3D.
3. **Geometry/UI** (`src/components/three`) — визуализация модели в 3D.
4. **Manufacturing** (`src/lib/costing`, `src/features/cutting`, `src/lib/validation`) — BOM, раскрой, валидации.
5. **Output** (`src/components/product/ExportPanel`) — JSON/CSV/PDF экспорт.

Состояние централизовано в `zustand` (`src/store/useCadStore.ts`) с `undo/redo` и `autosave`.

## Что уже реализовано (MVP)

- Next.js + TypeScript + Tailwind + Zustand + React Hook Form + Zod.
- Рабочий параметрический шаблон **shelving**.
- Шаблоны: `shelving`, `workbench`, `cabinet`, `frame_module`.
- 3D preview (orbit/pan/zoom, beauty/technical).
- Автоматический BOM и стоимость.
- Базовый раскрой фанеры и профиля.
- Экран сборки.
- Экспорт JSON/CSV/PDF.

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Деплой в GitHub Pages

Проект настроен на **статический экспорт Next.js** (`output: export`) и автоматический деплой через GitHub Actions.

### 1) Включить Pages в репозитории

- `Settings` → `Pages`
- `Build and deployment` → `Source: GitHub Actions`

### 2) Убедиться, что workflow есть

Файл уже добавлен: `.github/workflows/deploy-pages.yml`.

### 3) Запушить ветку

Workflow:
- устанавливает зависимости,
- собирает статический сайт,
- публикует папку `out/` в GitHub Pages.

Для корректной работы под поддиректорией репозитория автоматически выставляются:
- `GITHUB_PAGES=true`
- `BASE_PATH=/<repo-name>`

Эти переменные использует `next.config.mjs`.

### 4) URL приложения

После успешного деплоя приложение будет доступно по адресу:

`https://<username>.github.io/<repo-name>/`
