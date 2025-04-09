export async function GetPUSBProfile() {
  try {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent("https://api.pusb.or.id/v1/profile")}`;
    const res = await fetch(proxyUrl);

    const text = await res.text();
    console.log("Proxy response status:", res.status);
    console.log("Raw proxy response:", text);

    if (!text || text.trim() === "") throw new Error("Profile data is empty");
    
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return JSON.parse(text);
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (err) {
    console.error("Error fetching PUSB Profile:", err);
    return null;
  }
}


