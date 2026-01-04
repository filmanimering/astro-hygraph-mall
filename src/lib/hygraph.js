// src/lib/hygraph.js
export async function hygraphFetch(query, variables = {}) {
  // Hämta din token från .env
  const token = import.meta.env.HYGRAPH_TOKEN;

  const response = await fetch(import.meta.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Lägg till denna rad:
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error("Failed to fetch API");
  }
  return json.data;
}
