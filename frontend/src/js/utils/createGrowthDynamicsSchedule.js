import Chart from "chart.js/auto";
import { Chart } from "chart.js";

export function createGrowthDynamicsSchedule(data, ctx, optionsForChart) {
  // if mode is full or short
  if (data.length === 1) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data[0].map((row) => row.month),
        datasets: [
          {
            label: "Денежные средства",
            data: data[0].map((row) => row.amount),
            backgroundColor: ["#116ACC"],
          },
        ],
      },
      options: optionsForChart,
    });
  } // if mode is details
  else if (data.length === 2) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data[0].map((row) => row.month),
        datasets: [
          {
            label: "Убыль",
            data: data[0].map((row) => row.amount),
            backgroundColor: ["#FD4E5D"],
          },
          {
            label: "Прибыль",
            data: data[1].map(
              (row, index) => row.amount - data[0][index].amount
            ),
            backgroundColor: ["#76CA66"],
          },
        ],
      },
      options: optionsForChart,
    });
  }
}
