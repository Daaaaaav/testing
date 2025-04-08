export async function GetPUSBProfile() {
  try {
    const res = await fetch(`/api/proxy?url=${encodeURIComponent("https://api.pusb.or.id/v1/profile")}`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch (err) {
    console.error("Error fetching PUSB Profile:", err);
    return null;
  }
}

  