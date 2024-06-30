import { getMonth } from "./getMonth";

export function dateFormat(stringDate, mode) {
  const dateObj = new Date(stringDate);

  if (mode === "short") {
    const numberDay =
      dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate();
    const numberMonth =
      dateObj.getMonth() + 1 > 9
        ? dateObj.getMonth() + 1
        : "0" + (dateObj.getMonth() + 1);
    const numberYear = dateObj.getFullYear();

    return `${numberDay}.${numberMonth}.${numberYear}`;
  }

  if (mode === "full") {
    const numberDay =
      dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate();
    const numberYear = dateObj.getFullYear();

    return `${numberDay} ${getMonth(dateObj.getMonth())} ${numberYear}`;
  }
}
