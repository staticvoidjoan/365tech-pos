export function tvshCalculator(totalPrice: number) {
  const tvshRate: number = 20;
  const tvsh = totalPrice - totalPrice / (1 + tvshRate / 100);
  const subtotal = totalPrice - tvsh;
  const finalPrice = {
    subtotal: subtotal,
    tvsh: tvsh,
  };
  return finalPrice;
}
