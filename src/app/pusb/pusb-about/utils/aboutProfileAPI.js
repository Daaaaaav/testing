import axios from "axios";
import { buildProxiedUrl } from "../../../../config/config";

export const GetPUSBProfile = async () => {
  try {
    const response = await axios.get(buildProxiedUrl("/profile"));
    console.log("API Response:", response.data);
    return response.data?.data?.[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("API Error:", error.response);
    } else {
      console.log("General Error:", error);
    }
  }
  return null;
};
