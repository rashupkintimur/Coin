import { el } from "redom";
import { InputFormControlComponent } from "./InputFormControlComponent";

export function ViewNewTransactionComponent() {
  const button = el(
    "button.new-transaction__btn.btn.primary-btn.btn-small",
    el("span.btn-text.btn-mail", "Отправить")
  );
  // create form for make new transaction
  const form = el(
    "form.new-transaction__form.form",
    InputFormControlComponent({
      id: "account-number",
      labelText: "Номер счёта получателя",
      placeholder: "Номер счёта получателя",
      type: "text",
    }),
    InputFormControlComponent({
      id: "sum",
      labelText: "Сумма перевода",
      placeholder: "Сумма перевода",
      type: "text",
    }),
    button
  );
  const errorBlock = el(".error-block.login__error-block");

  return {
    button,
    form,
    errorBlock,
  };
}
