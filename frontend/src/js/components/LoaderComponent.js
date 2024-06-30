import { el, mount } from "redom";

export function LoaderComponent() {
  const container = el(".loader-container");
  const loader = el(".loader", el(".line.line--1"), el(".line.line--2"));

  mount(container, loader);

  return container;
}
