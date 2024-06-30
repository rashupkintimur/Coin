export async function currencyExchange(from, to, amount) {
  return (
    await fetch("http://localhost:3000/currency-buy", {
      method: "POST",
      headers: {
        Authorization: `Basic ${localStorage.getItem("_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
    })
  ).json();
}
