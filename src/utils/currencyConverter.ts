/**
 * Convert Pixels BRL currency format
 * @param value - Number to be converted
 * @returns Converted BRL string
 */

export function currencyConverter(value: number): string {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}
