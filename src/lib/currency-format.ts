export default function currencyFormat(val: string) {
  return (+val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
