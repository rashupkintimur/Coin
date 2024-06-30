import { el, mount } from "redom";
import { createListCurrencies } from "../utils/createListCurrencies";

/*
  get info about currencies current user,
  for example amount bitcoins or etherium
*/
export function YourCurrenciesComponent() {
  const wrapper = el(".background-shadow.your-currencies.info-big-block");

  const title = el("h3.title-mini-block.your-currencies__title", "Ваши валюты");
  const list = el("ul.currency-list");

  createListCurrencies(list);

  mount(wrapper, title);
  mount(wrapper, list);

  return wrapper;
}
