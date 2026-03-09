import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-4xl p-6 text-slate-800">
      <div className="mb-4">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Вернуться в конструктор
        </Link>
      </div>

      <h1 className="mb-4 text-2xl font-semibold">Документация CAD MVP</h1>
      <div className="space-y-3 text-sm">
        <p>
          Главная страница приложения — это сам конструктор на маршруте <code>/</code>.
        </p>
        <p>
          На маршруте <code>/docs</code> находится инструкция по локальному запуску и деплою.
        </p>

        <h2 className="pt-2 text-lg font-semibold">Локальный запуск</h2>
        <pre className="overflow-x-auto rounded bg-slate-100 p-3 text-xs">{`npm install\nnpm run dev`}</pre>

        <h2 className="pt-2 text-lg font-semibold">Деплой в GitHub Pages</h2>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Включить Pages: Settings → Pages → Source: GitHub Actions.</li>
          <li>Запушить изменения в ветку main.</li>
          <li>Дождаться workflow Deploy Next.js static export to GitHub Pages.</li>
          <li>Открыть сайт по URL GitHub Pages репозитория.</li>
        </ol>
      </div>
    </main>
  );
}
