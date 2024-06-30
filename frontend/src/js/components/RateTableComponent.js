import { el, mount } from "redom";
import growthArrow from "../../img/growth-indicator-arrow.svg";
import fallArrow from "../../img/fall-indicator-arrow.svg";

export function RateTableComponent() {
  const wrapper = el(".background-card.rate-table");

  const title = el(
    "h3.title-mini-block.rate-table__title",
    "Изменение курсов в реальном времени"
  );

  const list = el("ul.rate-table__list.currency-list");

  myObj.currencyFeed = new WebSocket("ws://localhost:3000/currency-feed");

  /*
    display information about exchange rate changes
  */
  myObj.currencyFeed.onmessage = function (data) {
    const dataCurrency = JSON.parse(data.data);

    /*
        if there are more than 11 elements of the list,
        then the last one is deleted
    */
    const allCurrencyListItems = list.querySelectorAll(
      "li.currency-list__item"
    );
    if (allCurrencyListItems.length > 11)
      allCurrencyListItems[allCurrencyListItems.length - 1].remove();

    const li = el("li.currency-list__item");
    const codeCurrency = el(
      "p.currency-list__code-currency",
      `${dataCurrency.from}/${dataCurrency.to}`
    );
    /*
        this block is needed to add dots between words (stylization)
      */
    const emptyParagraph = el(
      `p.currency-list__buffer.${
        dataCurrency.change === 1
          ? "profit"
          : dataCurrency.change === -1
          ? "decline"
          : ""
      }`
    );
    /*
        if there is an increase in price,
        then we show a green arrow up, otherwise a red arrow down.
        if the price has not changed we do not show the arrows
    */
    const amountExchange = el(
      "p.currency-list__amount",
      dataCurrency.rate,
      dataCurrency.change === 1
        ? el("img.currency-list__indicator", { src: growthArrow })
        : dataCurrency.change === -1
        ? el("img.currency-list__indicator", { src: fallArrow })
        : null
    );

    mount(li, codeCurrency);
    mount(li, emptyParagraph);
    mount(li, amountExchange);
    list.prepend(li);
  };

  mount(wrapper, title);

  mount(wrapper, list);

  return wrapper;
}
