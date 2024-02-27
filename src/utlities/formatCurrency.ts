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



export function formatCurrency(amount: number, currencyCode: string){
    switch (currencyCode){
        case "ALL":
            return ALL_FORMATTER.format(amount);
        case "EUR":
            return EUR_FORMATTER.format(amount); 
        case "USD":
            return USD_FORMATTER.format(amount); 
        default:
            return ALL_FORMATTER.format(amount);
    }
}