import { el, mount, unmount } from "redom";
import { HeaderComponent } from "../components/HeaderComponent";
import { HistoryTransactionsComponent } from "../components/HistoryTransactionsComponent";
import { NewTransactionComponent } from "../components/NewTransactionComponent";
import { GrowthDynamicsComponent } from "../components/GrowthDynamicsComponent";
import { AccountInfoComponent } from "../components/AccountInfoComponent";
import { LoaderComponent } from "../components/LoaderComponent";
import { createGrowthDynamicsSchedule } from "../utils/createGrowthDynamicsSchedule";
import { getAccount } from "../api/getAccount";

export function ViewAccountPage() {
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

  const container = el(".container.padding-container.view-account");

  // title and button for page
  const headerTop = el(".view-account__header-top.main__header");
  const title = el("h1.title", "Просмотр счёта");
  const button = el(
    "button.btn.primary-btn.btn-middle",
    el("span.btn-text.btn-arrow", "Вернуться назад")
  );

  let accountInfo = AccountInfoComponent(data.account, data.balance);

  // form for create new transactions and schedule of growth dynamics
  const newTransaction = NewTransactionComponent(data);
  let growthDynamics = GrowthDynamicsComponent(
    data.transactions,
    "short",
    "Динамика баланса",
    data.account
  );
  const wrapperInfo = el(".view-account__info", newTransaction, growthDynamics);

  // history of transactions (short version)
  let historyTransactions = HistoryTransactionsComponent(
    data.transactions,
    data.account,
    0,
    10
  );

  accountInfo.classList.add("view-account__account-info");
  growthDynamics.classList.add("clickable");
  historyTransactions.classList.add("clickable");

  growthDynamics.addEventListener("click", () => goHistoryBalancePage(data));
  historyTransactions.addEventListener("click", () =>
    goHistoryBalancePage(data)
  );

  button.addEventListener("click", () => myObj.app.update("accounts"));

  wrapperInfo.addEventListener("click", async (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    // set the height for the normal display of the loader
    growthDynamics.style.height = growthDynamics.clientHeight + "px";
    historyTransactions.style.height = 400 + "px";

    // delete blocks that need to be updated
    growthDynamics.querySelector("canvas").remove();
    historyTransactions.querySelector(".transactions-table").remove();

    const loaderGrowthDynamics = LoaderComponent();
    const loaderHistoryTransactions = LoaderComponent();

    mount(growthDynamics, loaderGrowthDynamics);
    mount(historyTransactions, loaderHistoryTransactions);

    const updatedData = (await getAccount(data.account)).payload;

    const growthDynamicsClone = GrowthDynamicsComponent(
      updatedData.transactions,
      "short",
      "Динамика баланса",
      updatedData.account
    );
    unmount(wrapperInfo, growthDynamics);
    mount(wrapperInfo, growthDynamicsClone);

    const historyTransactionsClone = HistoryTransactionsComponent(
      updatedData.transactions,
      updatedData.account,
      0,
      10
    );
    unmount(container, historyTransactions);
    mount(container, historyTransactionsClone);

    const accountInfoClone = AccountInfoComponent(data.account, data.balance);
    unmount(container, accountInfo);
    headerTop.after(accountInfoClone);

    growthDynamics = growthDynamicsClone;
    historyTransactions = historyTransactionsClone;
    accountInfo = accountInfoClone;
  });

  mount(headerTop, title);
  mount(headerTop, button);
  mount(container, headerTop);

  mount(container, accountInfo);
  mount(container, wrapperInfo);
  mount(container, historyTransactions);

  mount(wrapper, container);

  return wrapper;
}

function goHistoryBalancePage(data) {
  myObj.app.update("history-balance", data);
}
