export async function GetPUSBProfile() {
  try {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent("https://api.pusb.or.id/v1/profile")}`;
    const res = await fetch(proxyUrl);

    console.log("Proxy response status:", res.status);
    const text = await res.text();
    console.log("Raw proxy response:", text);

    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("Error fetching PUSB Profile:", err);
    return null;
  }
}

