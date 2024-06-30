import { el } from "redom";
import { InputFormControlComponent } from "./InputFormControlComponent";
import { SelectFormControlComponent } from "./SelectFormControlComponent";

export function ViewCurrencyExchangeComponent(res) {
  const button = el("button.btn.btn-small", "Обменять", { type: "submit" });
  const fromSelectWrapper = SelectFormControlComponent({
    id: "from",
    labelText: "Из",
    options: res.payload,
  });
  const toSelectWrapper = SelectFormControlComponent({
    id: "to",
    labelText: "В",
    options: res.payload,
  });

  // create form for make exchange form one currency to another
  const form = el(
    "form.currency-exchange__form exchange-form",
    el(
      ".exchange-form__wrapper",
      el(".exchange-form__top", fromSelectWrapper, toSelectWrapper),
      el(
        ".exchange-form__bottom",
        InputFormControlComponent({
          id: "amount",
          placeholder: "Сумма",
          labelText: "Сумма",
          type: "text",
        })
      )
    ),
    button
  );
  const errorBlock = el(".error-block.login__error-block");

  return {
    button,
    form,
    errorBlock,
  };
}
