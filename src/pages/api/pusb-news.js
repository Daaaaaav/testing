import axios from "axios";
import { buildProxiedUrl } from "../../config/config";

export async function GetPUSBNews() {
  try {
    const response = await axios.get(buildProxiedUrl("/news"));
    return response.data?.data;
  } catch (err) {
    throw new Error(`Fetch failed: ${err.message}`);
  }
}

export const GetPUSBNewsBySlug = async (slug) => {
  try {
    const response = await axios.get(buildProxiedUrl(`/news/${slug}`));
    return response.data?.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};
