import { el, mount } from "redom";
import { getCurrencies } from "../api/getCurrencies";

export async function createListCurrencies(list) {
  const res = await getCurrencies();
  const currencies = res.payload;
  const currenciesKeys = Object.keys(currencies);

  for (let i = 0; i < currenciesKeys.length; i++) {
    const li = el("li.currency-list__item");
    const codeCurrency = el(
      "p.currency-list__code-currency",
      currencies[currenciesKeys[i]].code
    );
    /*
      this block is needed to add dots between words (stylization)
    */
    const emptyParagraph = el("p.currency-list__buffer");
    const amountCurrency = el(
      "p.currency-list__amount",
      currencies[currenciesKeys[i]].amount
    );

    mount(li, codeCurrency);
    mount(li, emptyParagraph);
    mount(li, amountCurrency);
    mount(list, li);
  }
}
