import { el, mount } from "redom";

export function HeaderComponent(navItems = []) {
  const header = el("header.header");
  const container = el(".container", el("h2.header__logo", "Coin."));

  if (myObj.currencyFeed) myObj.currencyFeed.close();

  const ul = el("ul.header-nav__list");
  const nav = el("nav.header-nav", ul);

  // add nav elements (buttons)
  for (let i = 0; i < navItems.length; i++) {
    const li = el(
      "li.header-nav__item",
      el(
        `button.btn.white-btn.btn-middle${
          navItems[i].active ? ".white-btn--active" : ""
        }`,
        navItems[i].name
      )
    );

    li.addEventListener("click", () => {
      myObj.app.update(navItems[i].to);
    });

    mount(ul, li);
  }

  mount(container, nav);
  mount(header, container);

  return header;
}
