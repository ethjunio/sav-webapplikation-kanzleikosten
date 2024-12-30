export function formatCost(value: string) {
  const numericValue = parseFloat(value?.replace(/[^\d.-]/g, ''));
  return (
    numericValue.toLocaleString('de-CH', {
      style: 'decimal',
    }) + ' CHF'
  );
}
