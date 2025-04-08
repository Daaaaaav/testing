export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }
  
    const parsedUrl = new URL(url);
    const allowedDomain = "api.pusb.or.id";
  
    if (parsedUrl.hostname !== allowedDomain) {
      return res.status(403).json({ error: "Unauthorized domain" });
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
  
      res.status(response.status);
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
  
      const body = await response.text();
      res.send(body);
    } catch (error) {
      res.status(500).json({
        error: "Proxy request failed",
        message: error.message,
      });
    }
  }
  