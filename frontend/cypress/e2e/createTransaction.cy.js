/// <reference types="cypress" />

describe("Тест перевода с счёта на счёт", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Проверка наличия ошибок", () => {
    cy.get("li:first-child").contains("Открыть").click();

    cy.contains("Отправить").click();

    cy.contains("не указан счёт зачисления, или этого счёта не существует");

    cy.get("#account-number").type("23532165213465711154732177");

    cy.contains("Отправить").click();

    cy.contains("не указана сумма перевода, или она отрицательная");
  });

  it("Успешный перевод средств", () => {
    cy.get("li:first-child").contains("Открыть").click();

    cy.get("#account-number").type("23532165213465711154732177");
    cy.get("#sum").type("100");

    cy.contains("Отправить").click();

    cy.get(".error-block").children().should("have.length", 0);
  });
});
