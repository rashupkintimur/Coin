export function getMonthTransactions({
  transactions,
  numberMonth,
  year,
  mode,
  accountNumber,
}) {
  if (mode === "profit" && accountNumber) {
    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);

      if (
        transaction.to === accountNumber &&
        date.getMonth() === numberMonth &&
        date.getFullYear() === year
      ) {
        return true;
      }
    });
  } else if (mode === "decline" && accountNumber) {
    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);

      if (
        transaction.from === accountNumber &&
        date.getMonth() === numberMonth &&
        date.getFullYear() === year
      ) {
        return true;
      }
    });
  }
}
