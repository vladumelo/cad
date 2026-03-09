import { ProductConfig, ValidationMessage } from '@/types/domain';

export const validateShelving = (config: ProductConfig): ValidationMessage[] => {
  const warnings: ValidationMessage[] = [];
  const sectionWidth = config.width / (config.sectionsX || 1);

  if (sectionWidth > 1000) {
    warnings.push({
      id: 'span-too-big',
      level: 'warning',
      title: 'Слишком большой пролет полки',
      message: `Пролет секции ${Math.round(sectionWidth)} мм может прогибаться.`,
      suggestion: 'Увеличьте количество секций или добавьте промежуточную опору.',
    });
  }

  if (config.height > 2200 && !config.wallFixing) {
    warnings.push({
      id: 'high-rack',
      level: 'warning',
      title: 'Высокий стеллаж без фиксации',
      message: 'Конструкция выше 2200 мм требует раскосов или крепления к стене.',
      suggestion: 'Включите wall fixing или добавьте диагональные усилители.',
    });
  }

  if ((config.shelfCount || 0) < 2) {
    warnings.push({
      id: 'few-shelves',
      level: 'warning',
      title: 'Мало уровней',
      message: 'Количество полок менее 2 снижает жесткость конструкции.',
      suggestion: 'Добавьте минимум одну промежуточную полку.',
    });
  }

  return warnings;
};
