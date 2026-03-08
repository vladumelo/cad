export const parseProfile = (profile?: string) => {
  const raw = profile ?? '40x20x2';
  const [w = '40', h = '20', t = '2'] = raw.split('x');
  return {
    width: Number(w),
    height: Number(h),
    thickness: Number(t),
  };
};

export const mmToM = (v: number) => v / 1000;
