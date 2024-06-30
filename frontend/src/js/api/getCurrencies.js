export async function getCurrencies() {
  return (
    await fetch("http://localhost:3000/currencies", {
      headers: {
        Authorization: `Basic ${localStorage.getItem("_token")}`,
      },
    })
  ).json();
}
