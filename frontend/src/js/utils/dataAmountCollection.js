import { getCalcSumTransactions } from "./getCalcSumTransactions";
import { getMonth } from "./getMonth";
import { getMonthTransactions } from "./getMonthTransactions";

// collect the data of transactions for schedule
export function dataAmountCollection({
  transactions,
  numberMonth,
  year,
  count,
  data,
  mode,
  accountNumber,
}) {
  const transactionsMonth = getMonthTransactions({
    transactions,
    numberMonth,
    year,
    mode,
    accountNumber,
  });

  const totalTranactionsToMeMonth = getCalcSumTransactions(
    transactionsMonth,
    numberMonth
  );

  data.push({
    count,
    month: getMonth(numberMonth),
    amount: totalTranactionsToMeMonth,
  });

  data.sort((a, b) => b.count - a.count);
}
