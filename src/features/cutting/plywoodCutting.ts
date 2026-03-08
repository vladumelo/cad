import { CutSheet, Part } from '@/types/domain';

export const PLYWOOD_SHEET = { width: 2440, height: 1220, kerf: 3, margin: 10 };

export const generatePlywoodCutSheets = (parts: Part[]): CutSheet[] => {
  const panels = parts
    .filter((p) => p.category === 'shelf' && p.width && p.height)
    .flatMap((part) => Array.from({ length: part.qty }, () => ({
      partId: part.id,
      width: Math.round((part.width || 0) + PLYWOOD_SHEET.kerf),
      height: Math.round((part.height || 0) + PLYWOOD_SHEET.kerf),
    })))
    .sort((a, b) => b.height * b.width - a.height * a.width);

  const sheets: CutSheet[] = [];

  panels.forEach((panel) => {
    let placed = false;
    for (const sheet of sheets) {
      let cursorY = PLYWOOD_SHEET.margin;
      while (cursorY + panel.height <= sheet.height - PLYWOOD_SHEET.margin) {
        let cursorX = PLYWOOD_SHEET.margin;
        while (cursorX + panel.width <= sheet.width - PLYWOOD_SHEET.margin) {
          const collision = sheet.placements.some((p) =>
            cursorX < p.x + p.width &&
            cursorX + panel.width > p.x &&
            cursorY < p.y + p.height &&
            cursorY + panel.height > p.y,
          );
          if (!collision) {
            sheet.placements.push({ ...panel, x: cursorX, y: cursorY });
            sheet.usedArea += panel.width * panel.height;
            placed = true;
            break;
          }
          cursorX += 20;
        }
        if (placed) break;
        cursorY += 20;
      }
      if (placed) break;
    }

    if (!placed) {
      sheets.push({
        sheetIndex: sheets.length + 1,
        width: PLYWOOD_SHEET.width,
        height: PLYWOOD_SHEET.height,
        placements: [{ ...panel, x: PLYWOOD_SHEET.margin, y: PLYWOOD_SHEET.margin }],
        usedArea: panel.width * panel.height,
      });
    }
  });

  return sheets;
};
