/// <reference types="cypress" />

describe("Тест авторизации", () => {
  it("Проверка наличия ошибок", () => {
    cy.visit("http://localhost:1234");

    cy.contains("Войти").click();

    cy.contains('В поле "Логин" должно быть более 5 символов');
    cy.contains('В поле "Пароль" должно быть более 5 символов');
    cy.contains('В поле "Логин" не должно быть пробелов');
    cy.contains('В поле "Пароль" не должно быть пробелов');
  });

  it("Ввод неверного логина", () => {
    cy.visit("http://localhost:1234");

    cy.get("#login").type("tester");
    cy.get("#password").type("tester");

    cy.contains("Войти").click();

    cy.contains("Пользователя с таким логином не существует");
  });

  it("Ввод неверного пароля", () => {
    cy.visit("http://localhost:1234");

    cy.get("#login").type("developer");
    cy.get("#password").type("tester");

    cy.contains("Войти").click();

    cy.contains("Неверный пароль");
  });

  it("Ввод верных данных", () => {
    cy.login();

    cy.contains("Ваши счета");
  });
});
