import https from "https";

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

  const agent = new https.Agent({
    rejectUnauthorized: false, 
  });

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "", 
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
      agent: new https.Agent({ rejectUnauthorized: false }),
    });
  
    const body = await response.text();
  
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.send(body);
  
  } catch (error) {
    console.error("Proxy failed:", error); 
    res.status(500).json({
      error: "Proxy request failed",
      message: error.message,
    });
  }  
}
