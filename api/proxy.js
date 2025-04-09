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

  const { host, ...forwardedHeaders } = req.headers;

  try {
    console.log("Proxying request to:", url);

    const response = await fetch(url, {
      method: req.method,
      headers: forwardedHeaders,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
      agent,
    });

    const body = await response.text();

    console.log("Response status:", response.status);
    console.log("Raw response body:", body);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.status(response.status).send(body);
  } catch (error) {
    console.error("Proxy failed:", error);
    res.status(500).json({
      error: "Proxy request failed",
      message: error.message,
    });
  }
}
