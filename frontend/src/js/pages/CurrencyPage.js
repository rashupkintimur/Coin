import { el, mount, unmount } from "redom";
import { HeaderComponent } from "../components/HeaderComponent";
import { YourCurrenciesComponent } from "../components/YourCurrenciesComponent";
import { CurrencyExchangeComponent } from "../components/CurrencyExchangeComponent";
import { RateTableComponent } from "../components/RateTableComponent";
import { createListCurrencies } from "../utils/createListCurrencies";
import { LoaderComponent } from "../components/LoaderComponent";

export function CurrencyPage() {
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
        active: true,
      },
      {
        name: "Выйти",
        to: "login",
      },
    ])
  );

  const container = el(".container.padding-container.currency");

  const title = el("h1.title.currency__title", "Валютный обмен");

  const currencyWrapper = el(".currency__wrapper");
  /*
    info about current currencies user and form for make exchange
    from one currency to another
  */
  const currencyLeft = el(".currency__left");
  const yourCurrencies = YourCurrenciesComponent();
  const currencyExchange = CurrencyExchangeComponent();

  const currencyRight = el(".currency__right");
  const rateTable = RateTableComponent();

  /*
    when we make an exchange, the list of currencies is updated
  */
  currencyLeft.addEventListener("click", async (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    // set the height for the normal display of the loader
    yourCurrencies.style.height = yourCurrencies.clientHeight + "px";

    yourCurrencies.querySelector(".currency-list").remove();
    const loader = LoaderComponent();
    mount(yourCurrencies, loader);

    const list = el("ul.currency-list");
    // get current currencies data
    await createListCurrencies(list);

    unmount(yourCurrencies, loader);
    mount(yourCurrencies, list);
  });

  mount(container, title);

  mount(currencyLeft, yourCurrencies);
  mount(currencyLeft, currencyExchange);
  mount(currencyWrapper, currencyLeft);

  mount(currencyRight, rateTable);
  mount(currencyWrapper, currencyRight);

  mount(container, currencyWrapper);
  mount(wrapper, container);

  return wrapper;
}
