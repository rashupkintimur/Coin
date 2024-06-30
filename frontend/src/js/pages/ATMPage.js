import { el, mount } from "redom";
import { HeaderComponent } from "../components/HeaderComponent";
import { getPointsMap } from "../api/getPointsMap";

export function ATMPage() {
  const wrapper = el("div");
  mount(
    wrapper,
    HeaderComponent([
      {
        name: "Банкоматы",
        to: "atm",
        active: true,
      },
      {
        name: "Счета",
        to: "accounts",
      },
      {
        name: "Валюта",
        to: "currency",
      },
      {
        name: "Выйти",
        to: "login",
      },
    ])
  );

  const container = el(".container.padding-container.atm");

  const title = el("h1.title.atm__title", "Карта банкоматов");
  const map = el("#map.atm__map");

  ymaps.ready(init);

  // create map with ATM
  function init() {
    const mapObject = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 11,
    });

    // get ATM marks on the map and set them
    getPointsMap().then((points) => {
      points.payload.forEach((coords) => {
        mapObject.geoObjects.add(new ymaps.Placemark([coords.lat, coords.lon]));
      });
    });
  }

  mount(container, title);
  mount(container, map);

  mount(wrapper, container);

  return wrapper;
}
