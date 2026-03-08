# CAD MVP: Metal + Plywood Parametric Constructor

## Предложенная архитектура

Слои приложения:

1. **Product templates** (`src/data/templates.ts`, `src/features/templates`) — шаблоны изделий и стартовые пресеты.
2. **Parametric engine** (`src/lib/parametric`) — детерминированная генерация деталей, 3D-примитивов, сборки, валидаций.
3. **Geometry layer** (`src/lib/geometry`, `src/components/three`) — построение визуальных сущностей и 3D-сцены.
4. **Manufacturing layer** (`src/features/cutting`, `src/lib/costing`, `src/lib/validation`) — BOM, раскрой фанеры/металла, стоимость, проверки.
5. **Output layer** (`src/components/product/ExportPanel`) — экспорт JSON/CSV/PDF, таблицы спецификации и сборки.

Состояние централизовано в `zustand` (`src/store/useCadStore.ts`) с поддержкой:

- activeProduct, selectedPartId, displayMode, sceneMode;
- bom, cutSheets, assemblySteps, validationMessages;
- undo/redo;
- autosave/load из localStorage.

## Реализованный MVP

- Next.js + TypeScript + Tailwind + Zustand + React Hook Form + Zod.
- Рабочий шаблон **shelving** с параметрической генерацией каркаса и полок.
- Остальные семейства (`workbench`, `cabinet`, `frame_module`) заведены как стартовые шаблоны и проходят через единый движок.
- Живой 3D preview (react-three-fiber + drei): orbit, pan, zoom, режимы beauty/technical, выделение деталей.
- Автоматический BOM + стоимость + масса.
- Экран раскроя фанеры (first-fit heuristic, SVG карта листов).
- Экран раскроя профиля по хлыстам 6000 мм.
- Экран сборки с шагами.
- Экспорт JSON/CSV/PDF.

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

Дополнительно:

```bash
npm run typecheck
npm run build
```
