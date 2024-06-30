// reset errros and errors classes
export function inputHandler(form, errorBlock) {
  form
    .querySelectorAll(".form__input")
    .forEach((input) => input.classList.remove("invalid"));
  if (errorBlock) errorBlock.innerHTML = "";
}
