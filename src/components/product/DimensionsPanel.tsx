'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useCadStore } from '@/store/useCadStore';

const schema = z.object({
  width: z.number().min(400).max(4000),
  height: z.number().min(600).max(3500),
  depth: z.number().min(250).max(1600),
  sectionsX: z.number().min(1).max(6),
  shelfCount: z.number().min(2).max(12),
});

type FormValues = z.infer<typeof schema>;

export const DimensionsPanel = () => {
  const { activeProduct, updateProduct } = useCadStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      width: activeProduct.width,
      height: activeProduct.height,
      depth: activeProduct.depth,
      sectionsX: activeProduct.sectionsX || 1,
      shelfCount: activeProduct.shelfCount || 4,
    },
  });

  useEffect(() => {
    const sub = form.watch((value) => {
      if (form.formState.isValid) {
        updateProduct(value as Partial<typeof activeProduct>);
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateProduct]);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Габариты и секции</h3>
      {(['width', 'height', 'depth', 'sectionsX', 'shelfCount'] as const).map((field) => (
        <label key={field} className="flex items-center justify-between text-xs">
          <span>{field}</span>
          <input
            type="number"
            className="w-24 rounded border border-border px-2 py-1"
            {...form.register(field, { valueAsNumber: true })}
          />
        </label>
      ))}
    </div>
  );
};
