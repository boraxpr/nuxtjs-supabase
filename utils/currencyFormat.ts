// It will be available as randomEntry() (camelCase of file name without extension)
export default function (number: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(number);
}