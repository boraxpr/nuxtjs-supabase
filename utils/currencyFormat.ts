// It will be available as randomEntry() (camelCase of file name without extension)
export default function (number: number, currencyCode: string) {
  if (currencyCode === "" || currencyCode === null) {
    return "";
  }
  if (number === null) {
    number = 0;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(number);
}
