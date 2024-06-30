import { el, mount } from "redom";
import { getAccount } from "../api/getAccount";
import { dateFormat } from "../utils/dateFormat";

export function AccountCardComponent(data) {
  const card = el(".accounts__card.background-shadow.accounts-card");

  // number account and current balance
  const cardInfo = el(".accounts-card__info");
  const accountNumber = el("h3.accounts-card__title", data.account);
  const balance = el("h4.accounts-card__subtitle", `${data.balance} ₽`);

  // date last transaction
  const transactionInfo = el(".transaction-info");
  const transactionInfoTitle = el(
    "h5.transaction-info__title",
    "Последняя транзакция"
  );
  const dateLastTransaction = data.transactions.length
    ? dateFormat(data.transactions[0].date, "full")
    : "Ещё нет";
  const transactionInfoDate = el(
    "span.transaction-info__date",
    dateLastTransaction
  );

  // open details page about account
  const button = el(
    "button.accounts-card__btn.btn.primary-btn.btn-middle",
    "Открыть"
  );

  // create new account
  button.addEventListener("click", async () => {
    const dataAccount = await getAccount(data.account);

    myObj.app.update("view-account", dataAccount.payload);
  });

  mount(transactionInfo, transactionInfoTitle);
  mount(transactionInfo, transactionInfoDate);
  mount(cardInfo, accountNumber);
  mount(cardInfo, balance);
  mount(cardInfo, transactionInfo);
  mount(cardInfo, button);
  mount(card, cardInfo);

  return card;
}
