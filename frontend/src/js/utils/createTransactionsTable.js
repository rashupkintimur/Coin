import { el, mount } from "redom";
import { dateFormat } from "./dateFormat";

export function createTable(transactions, accountNumber, from, shift) {
  const table = el(".transactions-table");
  const tableHeadersList = el(
    "ul.transactions-table__headers-list",
    el("h4", "Счёт отправителя"),
    el("h4", "Счёт получателя"),
    el("h4", "Сумма"),
    el("h4", "Дата")
  );

  mount(table, tableHeadersList);

  const to = from + shift;
  transactions = transactions.slice(from, to);

  const list = el("ul.transactions-table__list");

  for (
    let i = 0;
    i < (transactions.length === shift ? shift : transactions.length);
    i++
  ) {
    const transaction = transactions[i];

    const li = el("li.transactions-table__item");
    const from = el("p.transactions-table__info-text", transaction.from);
    const to = el("p.transactions-table__info-text", transaction.to);
    const isProfit = accountNumber === transaction.to;
    const amount = el(
      `p.transactions-table__info-text${
        isProfit ? ".is-profit" : ".is-decline"
      }`,
      `${isProfit ? "+" : "-"} ${transaction.amount} ₽`
    );
    const date = el(
      "p.transactions-table__info-text",
      dateFormat(transaction.date, "short")
    );

    mount(li, from);
    mount(li, to);
    mount(li, amount);
    mount(li, date);
    mount(list, li);
  }

  mount(table, list);

  return table;
}
