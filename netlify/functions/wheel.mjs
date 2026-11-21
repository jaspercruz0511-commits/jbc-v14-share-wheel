import { getStore } from "@netlify/blobs";

const STORE = "jbc-shared-wheels";
const MAX_BODY = 4_500_000;
const cors = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
const json = (data, status=200) => new Response(JSON.stringify(data), { status, headers: cors });

export default async (request) => {
  try {
    const store = getStore(STORE);
    if (request.method === "POST") {
      const raw = await request.text();
      if (new TextEncoder().encode(raw).length > MAX_BODY) return json({ error: "Share data is too large. Reduce entries or image sizes." }, 413);
      let data;
      try { data = JSON.parse(raw); } catch { return json({ error: "Invalid share data." }, 400); }
      if (!data || !Array.isArray(data.entries) || data.entries.length < 1 || data.entries.length > 50000) return json({ error: "Please load between 1 and 50,000 entries before sharing." }, 400);
      if (data.entries.some(x => typeof x !== "string" || x.length > 500)) return json({ error: "One or more entry names are invalid or too long." }, 400);
      const id = crypto.randomUUID().replaceAll("-", "");
      const saved = { title: String(data.title || "JBC Roulette").slice(0,80), entries: data.entries, settings: data.settings || {}, logoData: data.logoData || "", backgroundImage: data.backgroundImage || "", createdAt: new Date().toISOString() };
      await store.setJSON(id, saved, { onlyIfNew: true });
      return json({ id });
    }
    if (request.method === "GET") {
      const id = new URL(request.url).searchParams.get("id") || "";
      if (!/^[a-f0-9]{32}$/.test(id)) return json({ error: "Invalid share link." }, 400);
      const data = await store.get(id, { type: "json", consistency: "strong" });
      if (!data) return json({ error: "This shared roulette was not found." }, 404);
      return json(data);
    }
    return json({ error: "Method not allowed." }, 405);
  } catch (error) {
    console.error("JBC share function error:", error);
    return json({ error: "The share service is not ready yet. Please try again after deployment." }, 500);
  }
};
