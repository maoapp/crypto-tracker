export const formatPrice = (price: string): string => {
  return parseFloat(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export const formatChange = (change: string): string => {
  const changeNum = parseFloat(change);
  return changeNum.toFixed(2) + '%';
}
