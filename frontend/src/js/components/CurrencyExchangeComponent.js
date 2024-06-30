import { el, mount } from "redom";
import { getAllCurrencies } from "../api/getAllCurrencies";
import { inputHandler } from "../utils/inputHandler";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { ViewCurrencyExchangeComponent } from "./ViewCurrencyExchangeComponent";
import { handleForm } from "../utils/handleForm";

export function CurrencyExchangeComponent() {
  const wrapper = el(".background-shadow.info-big-block.currency-exchange");

  const title = el(
    "h3.title-mini-block.currency-exchange__title",
    "Обмен валюты"
  );

  getAllCurrencies().then((res) => {
    const { button, form, errorBlock } = ViewCurrencyExchangeComponent(res);

    const from = form.querySelector("#from");
    const to = form.querySelector("#to");
    const amount = form.querySelector("#amount");

    // clear input errors
    from.addEventListener("change", () => inputHandler(form, errorBlock));
    to.addEventListener("change", () => inputHandler(form, errorBlock));
    amount.addEventListener("input", () => inputHandler(form, errorBlock));

    // make exchange and validation response
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      await handleForm({
        form,
        errorBlock,
        from,
        to,
        amount,
        type: "exchange",
        errors: {
          amount:
            'Поле "Сумма перевода" должно состоять исключительно из цифр и не ровняться нулю',
          "Invalid account from":
            "не указан адрес счёта списания, или этот счёт не принадлежит вам",
          "Invalid account to":
            "не указан счёт зачисления, или этого счёта не существует",
          "Invalid amount": "не указана сумма перевода, или она отрицательная",
          "Overdraft prevented":
            "вы попытались перевести больше денег, чем доступно на счёте списания",
        },
      });

      amount.value = "";
    });

    mount(wrapper, form);
    mount(wrapper, errorBlock);

    const choicesOptions = {
      allowHTML: true,
      position: "top",
      searchEnabled: false,
      itemSelectText: "",
      classNames: {
        containerOuter: "choices currency-exchange__select",
      },
    };

    new Choices(from, choicesOptions);

    new Choices(to, choicesOptions);
  });

  mount(wrapper, title);

  return wrapper;
}
