export async function transaction(from, to, amount) {
  return (
    await fetch("http://localhost:3000/transfer-funds", {
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
