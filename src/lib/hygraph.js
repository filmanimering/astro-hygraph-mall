// src/lib/hygraph.js
export async function hygraphFetch(query, variables = {}) {
    const response = await fetch(import.meta.env.HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    if (json.errors) {
        throw new Error("Failed to fetch API");
    }
    return json.data;
}