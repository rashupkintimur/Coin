export async function getAccount(accountNumber) {
  return (
    await fetch(`http://localhost:3000/account/${accountNumber}`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("_token")}`,
      },
    })
  ).json();
}
