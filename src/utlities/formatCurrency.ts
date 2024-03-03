const ALL_FORMATTER = new Intl.NumberFormat("sq-AL", {
  currency: "ALL",
  style: "currency",
});

const EUR_FORMATTER = new Intl.NumberFormat("de-DE", {
  currency: "EUR",
  style: "currency",
});

const USD_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
});

const currencyCodeLocal = localStorage.getItem("selectedCurrency");

export function formatCurrency(amount: number, currencyCode: string) {
  switch (currencyCodeLocal) {
    case "ALL":
      return ALL_FORMATTER.format(amount);
    case "EUR":
      return EUR_FORMATTER.format(amount / 100);
    case "USD":
      return USD_FORMATTER.format(amount / 98);
    default:
      return ALL_FORMATTER.format(amount);
  }
}
