import { mount } from "redom";
import { createErrorMessage } from "./createErrorMessage";
import { inputHandler } from "./inputHandler";

export async function handleForm({
  form,
  errorBlock,
  from,
  to,
  amount,
  type,
  errors,
}) {
  inputHandler(form, errorBlock);

  if (Number(amount.value) === 0 || !/[0-9]/.test(amount.value)) {
    mount(errorBlock, createErrorMessage(errors.amount));
    return;
  }

  let response = null;

  if (type === "new-transaction") {
    const transaction = (await import("../api/transaction")).transaction;
    response = await transaction(from, to.value, amount.value);

    if (to.value.length !== 26) {
      response.error = errors["Invalid account to"];
      return;
    }
  } else if (type === "exchange") {
    const currencyExchange = (await import("../api/currencyExchange"))
      .currencyExchange;
    response = await currencyExchange(from.value, to.value, amount.value);
  }

  if (response.error) {
    mount(errorBlock, createErrorMessage(errors[response.error]));

    return;
  }
}
