import { el, mount } from "redom";
import { createTable } from "../utils/createTransactionsTable";

export function HistoryTransactionsComponent(
  transactions,
  accountNumber,
  from,
  shift
) {
  // variables for work with pages
  const maxLinesPage = 25;
  let currentPage = 1;
  const pages = Math.ceil(transactions.length / maxLinesPage);
  const pageTitle = el("h4.transactions__subtitle", `${currentPage}/${pages}`);

  const wrapper = el(".background-card.transactions.info-mini-block");

  const headerWrapper = el(".transactions__header");
  const title = el("h3.transactions__title", "История переводов");
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  let table = el(
    ".clickable",
    createTable(transactions, accountNumber, from, shift)
  );

  // if we use a page-by-page approach
  if (shift === maxLinesPage) {
    mount(headerWrapper, title);
    mount(headerWrapper, pageTitle);
    mount(wrapper, headerWrapper);
    mount(wrapper, table);

    /*
      Switching between pages is done by 
      clicking on both sides of the table
    */
    table.addEventListener("click", (event) => {
      const widthTable = event.currentTarget.clientWidth;
      const clickSide = event.clientX > widthTable / 2 ? "right" : "left";

      if (clickSide === "left") {
        if (currentPage - 1 > 0) {
          currentPage--;
          from -= shift;

          pageTitle.textContent = `${currentPage}/${pages}`;

          table.innerHTML = "";
          table.innerHTML = createTable(
            transactions,
            accountNumber,
            from,
            shift
          ).innerHTML;
        }
      } else if (clickSide === "right") {
        if (currentPage + 1 <= pages) {
          currentPage++;
          from += shift;

          pageTitle.textContent = `${currentPage}/${pages}`;

          table.innerHTML = "";
          table.innerHTML = createTable(
            transactions,
            accountNumber,
            from,
            shift
          ).innerHTML;
        }
      }
    });
  } else {
    mount(headerWrapper, title);
    mount(wrapper, headerWrapper);
    mount(wrapper, table);
  }

  return wrapper;
}
