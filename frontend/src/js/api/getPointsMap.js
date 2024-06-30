export async function getPointsMap() {
  return (
    await fetch("http://localhost:3000/banks", {
      headers: {
        Authorization: `Basic ${localStorage.getItem("_token")}`,
      },
    })
  ).json();
}
