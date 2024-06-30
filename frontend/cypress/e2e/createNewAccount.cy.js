/// <reference types="cypress" />

describe("Создание нового счёта", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Создание счёта", () => {
    cy.contains("Создать новый счёт").click();

    cy.get("li").should("have.length", 38);
  });
});
