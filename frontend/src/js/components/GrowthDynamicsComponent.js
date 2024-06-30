import Chart from "chart.js/auto";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { el, mount } from "redom";
import { dataAmountCollection } from "../utils/dataAmountCollection";
import { createGrowthDynamicsSchedule } from "../utils/createGrowthDynamicsSchedule";

export function GrowthDynamicsComponent(
  transactions,
  mode,
  titleBlock,
  accountNumber
) {
  Chart.register(zoomPlugin);
  const optionsForChart = {
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };
  const container = el(".background-shadow.growth-dynamics.info-mini-block");

  const title = el("h3.title-mini-block", titleBlock);

  const data = [];
  const date = new Date();

  /*
    short version schedule
    shows 12 month statistics
  */
  if (mode === "short") {
    data[0] = [];
    const maxMonthes = 6;

    for (let i = 0; i < maxMonthes; i++) {
      if (i > 0) date.setMonth(date.getMonth() - 1);

      dataAmountCollection({
        transactions,
        numberMonth: date.getMonth(),
        year: date.getFullYear(),
        count: i,
        data: data[0],
        mode: "profit",
        accountNumber,
      });
    }
  } /* 
      full version schedule
      shows 12 month statistics
    */ else if (mode === "full") {
    data[0] = [];

    for (let i = 0; i < 12; i++) {
      if (i > 0) date.setMonth(date.getMonth() - 1);

      dataAmountCollection({
        transactions,
        numberMonth: i,
        year: date.getFullYear(),
        count: i,
        data: data[0],
        mode: "profit",
        accountNumber,
      });
    }
  } /*
      details version schedule
      shows the ratio of incoming outgoing transactions
    */ else if (mode === "details") {
    data[0] = [];
    data[1] = [];

    for (let i = 0; i < 12; i++) {
      if (i > 0) date.setMonth(date.getMonth() - 1);

      dataAmountCollection({
        transactions,
        numberMonth: i,
        year: date.getFullYear(),
        count: i,
        data: data[0],
        mode: "decline",
        accountNumber,
      });

      dataAmountCollection({
        transactions,
        numberMonth: i,
        year: date.getFullYear(),
        count: i,
        data: data[1],
        mode: "profit",
        accountNumber,
      });
    }
  }

  const ctx = el("canvas");
  createGrowthDynamicsSchedule(data, ctx, optionsForChart);

  mount(container, title);
  mount(container, ctx);

  return container;
}
