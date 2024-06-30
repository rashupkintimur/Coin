export async function getAllCurrencies() {
  return (
    await fetch("http://localhost:3000/all-currencies", {
      headers: {
        Authorization: `Basic ${localStorage.getItem("_token")}`,
      },
    })
  ).json();
}
