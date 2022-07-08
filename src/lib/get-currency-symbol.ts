export default function getCurrencySymbol(currencyCode?: string) {
  switch (currencyCode) {
    case 'GPT':
      return 'G';
    case 'KRW':
      return '₩';
    default:
      return currencyCode;
  }
}
