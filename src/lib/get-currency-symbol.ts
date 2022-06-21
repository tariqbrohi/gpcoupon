export default function getCurrencySymbol(lang?: string) {
  switch (lang) {
    case "en":
      return "$";
    case "ko":
      return "₩";
    default:
      return "G";
  }
}
