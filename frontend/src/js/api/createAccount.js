export async function createAccount() {
  return (
    await fetch("http://localhost:3000/create-account", {
      method: "POST",
      headers: {
        Authorization: `Basic ${localStorage.getItem("_token")}`,
      },
    })
  ).json();
}
