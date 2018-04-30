export function currencyToStr (symbol, value) {
  return (value > 0) ? `${symbol}${value.toFixed(2)}` : `-$${value.toFixed(2).slice(1)}`;
};
