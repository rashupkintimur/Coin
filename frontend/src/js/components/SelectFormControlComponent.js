import { el, mount } from "redom";

export function SelectFormControlComponent({ labelText, id, options }) {
  const wrapper = el(".form__control");
  const label = el("label.form__label", labelText, { for: id });
  const select = el(`select#${id}`);

  for (let option of options) {
    const optionSelect = el("option", option, { value: option });

    mount(select, optionSelect);
  }

  mount(wrapper, label);
  mount(wrapper, select);

  return wrapper;
}
