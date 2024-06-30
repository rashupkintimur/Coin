export async function getAccountsAPI() {
  return (
    await fetch("http://localhost:3000/accounts", {
      headers: {
        Authorization: `Basic ${localStorage.getItem("_token")}`,
      },
    })
  ).json();
}
