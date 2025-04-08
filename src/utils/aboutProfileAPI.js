export async function GetPUSBProfile() {
    try {
        // TODO: Replace with your API endpoint
      const response = await fetch(`/api/proxy?url=${encodeURIComponent("https://api.pusb.or.id/v1/profile")}`)
      ;
      if (!response.ok) throw new Error("Failed to fetch profile");
      return await response.json();
    } catch (error) {
      console.error("Error fetching PUSB Profile:", error);
      return null;
    }
  }
  