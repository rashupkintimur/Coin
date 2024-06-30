import { el, mount, unmount } from "redom";
import { HeaderComponent } from "../components/HeaderComponent";
import { renderAccountsList } from "../utils/renderAccountsList";
import { getAccountsAPI } from "../api/getAccountsAPI";
import { createAccount } from "../api/createAccount";
import { LoaderComponent } from "../components/LoaderComponent";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";

export function AccountsPage() {
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
        active: true,
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

  const loader = LoaderComponent();
  // get info about all user accounts
  const dataAccounts = getAccountsAPI();

  const container = el(".container.padding-container.accounts");

  const header = el(".accounts__header.main__header");
  const title = el("h1.title.accounts__title", "Ваши счета");
  const select = el(
    "select",
    el("option", "Сортировка", {
      placeholder: true,
    }),
    el("option", "По номеру"),
    el("option", "По балансу"),
    el("option", "По последней транзакции")
  );
  const headerLeft = el(".accounts__header-left", [title, select]);
  const button = el(
    "button.btn.primary-btn.btn-middle",
    el("span.btn-text.btn-plus", "Создать новый счёт")
  );

  // accounts list
  const accountsList = el("ul.accounts__list");

  // create new account
  button.addEventListener("click", async () => {
    await createAccount();

    getAccountsAPI().then((res) => handleDataAccounts(res, accountsList));
  });

  // sort accounts
  select.addEventListener("change", async (event) => {
    const dataAccountsArray = (await dataAccounts).payload;

    switch (event.target.value) {
      case "По номеру":
        dataAccountsArray.sort((a, b) => b.account - a.account);
        break;
      case "По балансу":
        dataAccountsArray.sort((a, b) => b.balance - a.balance);
        break;
      case "По последней транзакции":
        dataAccountsArray.sort(
          (a, b) =>
            new Date(b.transactions.date) - new Date(a.transactions.date)
        );
        break;
    }

    renderAccountsList(dataAccountsArray, accountsList);
  });

  dataAccounts
    .then((res) => handleDataAccounts(res, accountsList))
    .finally(() => unmount(container, loader));

  mount(header, headerLeft);
  mount(header, button);
  mount(container, header);

  mount(container, loader);
  mount(container, accountsList);

  mount(wrapper, container);

  new Choices(select, {
    allowHTML: true,
    position: "bottom",
    searchEnabled: false,
    itemSelectText: "",
    classNames: {
      containerOuter: "choices accounts__select",
    },
  });

  return wrapper;
}

// handler for a request to obtain account data
function handleDataAccounts(res, accountsList) {
  renderAccountsList(res.payload, accountsList);
}
