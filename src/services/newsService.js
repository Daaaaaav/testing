import axios from "axios";
import { buildProxiedUrl } from "../../config/config";

export const GetPUSBCNC = async () => {
  try {
    const response = await axios.get(buildProxiedUrl("/cnc"));
    return response.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
  return null;
};