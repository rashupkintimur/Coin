export function getCalcSumTransactions(transactions, currentNumberMonth, year) {
  return transactions.reduce((totalProfit, transaction) => {
    const date = new Date(transaction.date);

    if (date.getMonth() === currentNumberMonth)
      return (totalProfit += transaction.amount);

    return totalProfit;
  }, 0);
}
