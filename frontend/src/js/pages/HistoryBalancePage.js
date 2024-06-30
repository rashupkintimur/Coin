import { el, mount } from "redom";
import { HeaderComponent } from "../components/HeaderComponent";
import { AccountInfoComponent } from "../components/AccountInfoComponent";
import { GrowthDynamicsComponent } from "../components/GrowthDynamicsComponent";
import { HistoryTransactionsComponent } from "../components/HistoryTransactionsComponent";

export function HistoryBalancePage() {
  const wrapper = el("div");
  mount(
    wrapper,
    HeaderComponent([
      {
        name: "Банкоматы",
        to: "atm",
      },
      {
        name: "Счета",
        to: "accounts",
      },
      {
        name: "Валюта",
        to: "currency",
      },
      {
        name: "Выйти",
        to: "login",
      },
    ])
  );

  const data = arguments[1];

  const container = el(".container.padding-container.history-balance");

  // title and button for page
  const headerTop = el(".history-balance__header-top.main__header");
  const title = el("h1.title", "История баланса");
  const button = el(
    "button.btn.primary-btn.btn-middle",
    el("span.btn-text.btn-arrow", "Вернуться назад")
  );

  // info about number account and user current balance
  const accountInfo = AccountInfoComponent(data.account, data.balance);

  // schedule growth dynamics (full version) and ration incoming outgoing transactions
  const growthDynamicsGeneral = GrowthDynamicsComponent(
    data.transactions,
    "full",
    "Динамика баланса",
    data.account
  );
  const growthDynamicsRatio = GrowthDynamicsComponent(
    data.transactions,
    "details",
    "Соотношение входящих исходящих транзакций",
    data.account
  );
  const wrapperInfo = el(
    ".history-balance__info",
    growthDynamicsGeneral,
    growthDynamicsRatio
  );

  // history transactions (full version width scrolling pages)
  const historyTransactions = HistoryTransactionsComponent(
    data.transactions,
    data.account,
    0,
    25
  );

  accountInfo.classList.add("history-balance__account-info");

  button.addEventListener("click", () =>
    myObj.app.update("view-account", data)
  );

  mount(headerTop, title);
  mount(headerTop, button);
  mount(container, headerTop);

  mount(container, accountInfo);
  mount(container, wrapperInfo);
  mount(container, historyTransactions);

  mount(wrapper, container);

  return wrapper;
}
