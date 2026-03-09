import { generateShelving } from '@/lib/parametric/shelving';
import { ProductCalculation, ProductConfig } from '@/types/domain';

export const calculateProduct = (config: ProductConfig): ProductCalculation => {
  switch (config.type) {
    case 'shelving':
      return generateShelving(config);
    case 'workbench':
    case 'cabinet':
    case 'frame_module':
      return generateShelving({ ...config, type: 'shelving' });
    default:
      return generateShelving({ ...config, type: 'shelving' });
  }
};
