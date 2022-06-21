const convert = (gpoint: number, rate: number, qty: number) => {
  if (!gpoint || !rate || !qty) return 0;

  return new Intl.NumberFormat('ko', {
    style: 'currency',
    currency: 'KRW',
  }).format(gpoint * rate * qty);
};

export default convert;
