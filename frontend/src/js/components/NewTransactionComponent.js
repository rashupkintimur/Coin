import { el, mount } from "redom";
import { inputHandler } from "../utils/inputHandler";
import { handleForm } from "../utils/handleForm";
import { ViewNewTransactionComponent } from "./ViewNewTransactionComponent";

export function NewTransactionComponent(data) {
  const wrapper = el(".new-transaction.background-card.info-mini-block");

  const title = el(
    "h3.title-mini-block.new-transaction__title",
    "Новый перевод"
  );

  const { button, form, errorBlock } = ViewNewTransactionComponent();

  const from = data.account;
  const to = form.querySelector("#account-number");
  const amount = form.querySelector("#sum");

  // clear input errors
  to.addEventListener("input", () => inputHandler(form, errorBlock));
  amount.addEventListener("input", () => inputHandler(form, errorBlock));

  // validation response and sending data for make new transaction
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    await handleForm({
      form,
      errorBlock,
      from,
      to,
      amount,
      type: "new-transaction",
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

    to.value = "";
    amount.value = "";
  });

  mount(wrapper, title);
  mount(wrapper, form);
  mount(wrapper, errorBlock);

  return wrapper;
}
