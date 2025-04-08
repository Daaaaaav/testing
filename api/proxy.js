export default async function handler(req, res) {
    const url = req.query.url;
    const allowedDomain = "api.pusb.or.id";
    const urlObj = new URL(url);

    if (urlObj.hostname !== allowedDomain) {
    return res.status(403).json({ error: "Unauthorized domain" });
    }

  
    if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }
  
    try {
      const response = await fetch(url, {
        method: req.method,
        headers: {
          ...req.headers,
          host: "", 
        },
        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
      });
  
      const data = await response.text();
  
      res.setHeader("Content-Type", response.headers.get("content-type") || "application/json");
      res.status(response.status).send(data);
    } catch (error) {
      res.status(500).json({ error: "Proxy request failed", details: error.message });
    }
  }
  