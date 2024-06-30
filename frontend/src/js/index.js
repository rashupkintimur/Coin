import { mount, router } from "redom";
import { LoginPage } from "./pages/LoginPage";
import { AccountsPage } from "./pages/AccountsPage";
import { ATMPage } from "./pages/ATMPage";
import { ViewAccountPage } from "./pages/ViewAccountPage";
import { CurrencyPage } from "./pages/CurrencyPage";
import { HistoryBalancePage } from "./pages/HistoryBalancePage";

window.myObj = {};

myObj.app = router("#app", {
  login: LoginPage,
  accounts: AccountsPage,
  atm: ATMPage,
  currency: CurrencyPage,
  "view-account": ViewAccountPage,
  "history-balance": HistoryBalancePage,
});

mount(document.body, myObj.app);

/*
  if the user is logged in, then we transfer him 
  directly to the accounts page
*/
if (localStorage.getItem("_token")) {
  myObj.app.update("accounts");
} else {
  myObj.app.update("login");
}
