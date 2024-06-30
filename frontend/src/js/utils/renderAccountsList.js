import { el, mount } from "redom";
import { AccountCardComponent } from "../components/AccountsCardComponent";

export function renderAccountsList(accounts, accountsList) {
  accountsList.innerHTML = "";

  accounts.forEach((account) => {
    mount(accountsList, el("li", AccountCardComponent(account)));
  });
}
