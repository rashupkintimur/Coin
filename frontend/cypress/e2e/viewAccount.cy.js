/// <reference types="cypress" />

describe("Тест просмотра счёта", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Просмотр счёта", () => {
    cy.get("li:first-child").contains("Открыть").click();

    cy.contains("Просмотр счёта");
  });
});
