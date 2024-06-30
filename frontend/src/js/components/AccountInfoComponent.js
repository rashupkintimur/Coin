import { el, mount } from "redom";

// return info about number account and current balance
export function AccountInfoComponent(accountNumber, balance) {
  const wrapper = el(".account-info");

  const accountNumberTitle = el("h2.account-info__title", `№ ${accountNumber}`);
  const balanceWrapper = el(".balance");
  const balanceTitle = el("h3.balance__title", "Баланс");
  const balanceText = el("span.balance__span", `${balance} ₽`);

  mount(balanceWrapper, balanceTitle);
  mount(balanceWrapper, balanceText);

  mount(wrapper, accountNumberTitle);
  mount(wrapper, balanceWrapper);

  return wrapper;
}
