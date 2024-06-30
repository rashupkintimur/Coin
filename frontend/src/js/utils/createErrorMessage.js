import { el } from "redom";

export function createErrorMessage(message) {
  const error = el("p.error-message", message);

  return error;
}
