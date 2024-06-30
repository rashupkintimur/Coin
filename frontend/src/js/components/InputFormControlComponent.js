import { el, mount } from "redom";

export function InputFormControlComponent({
  id,
  labelText,
  placeholder,
  type,
}) {
  const wrapper = el(".form__control");
  const label = el("label.form__label", labelText, { for: id });
  const input = el(`input.form__input#${id}`, {
    placeholder,
    type,
  });

  mount(wrapper, label);
  mount(wrapper, input);

  return wrapper;
}
