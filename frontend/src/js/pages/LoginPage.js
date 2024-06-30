import { el, mount } from "redom";
import { HeaderComponent } from "../components/HeaderComponent";
import { createErrorMessage } from "../utils/createErrorMessage";
import { loginAPI } from "../api/loginAPI";
import { inputHandler } from "../utils/inputHandler";
import { InputFormControlComponent } from "../components/InputFormControlComponent";

export function LoginPage() {
  /*
    when we click button "Выйти", we are let's move on login page
  */
  localStorage.getItem("_token") ? localStorage.removeItem("_token") : null;

  const wrapper = el("div");
  mount(wrapper, HeaderComponent());

  const main = el(".login-container.container");
  const container = el(".background-card.login");

  const title = el("h1.login__title.title", "Вход в аккаунт");

  const button = el("button.login__btn.btn.primary-btn.btn-small", "Войти");
  // form for login
  const form = el(
    "form.form.login__form",
    InputFormControlComponent({
      id: "login",
      labelText: "Логин",
      placeholder: "Логин",
      type: "text",
    }),
    InputFormControlComponent({
      id: "password",
      labelText: "Пароль",
      placeholder: "Пароль",
      type: "password",
    }),
    button
  );
  const errorBlock = el(".error-block.login__error-block");

  const login = form.querySelector("#login");
  const password = form.querySelector("#password");
  const REG_EXP = /^\S+$/;

  // clear input errors
  login.addEventListener("input", () => inputHandler(form, errorBlock));
  password.addEventListener("input", () => inputHandler(form, errorBlock));

  // validation and sending data for login
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    inputHandler(form, errorBlock);
    const errors = [];

    if (login.value.length < 6) {
      login.classList.add("invalid");
      errors.push(new TypeError('В поле "Логин" должно быть более 5 символов'));
    }

    if (password.value.length < 6) {
      password.classList.add("invalid");
      errors.push(
        new TypeError('В поле "Пароль" должно быть более 5 символов')
      );
    }

    if (!REG_EXP.test(login.value)) {
      login.classList.add("invalid");
      errors.push(new TypeError('В поле "Логин" не должно быть пробелов'));
    }

    if (!REG_EXP.test(password.value)) {
      password.classList.add("invalid");
      errors.push(new TypeError('В поле "Пароль" не должно быть пробелов'));
    }

    if (errors.length) {
      for (let error of errors) {
        mount(errorBlock, createErrorMessage(error.message));
      }

      return;
    }

    const response = await loginAPI(login.value, password.value);

    if (response.error) {
      switch (response.error) {
        case "No such user":
          mount(
            errorBlock,
            createErrorMessage("Пользователя с таким логином не существует")
          );
          break;
        case "Invalid password":
          mount(errorBlock, createErrorMessage("Неверный пароль"));
          break;
      }

      return;
    }

    localStorage.setItem("_token", response.payload.token);

    myObj.app.update("accounts");
  });

  mount(container, title);

  mount(container, form);
  mount(container, errorBlock);

  mount(main, container);
  mount(wrapper, main);

  return wrapper;
}
