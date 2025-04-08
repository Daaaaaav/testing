import axios from "axios";
import { buildProxiedUrl } from "../../config/config";

export const GetPUSBEvent = async () => {
  try {
    const response = await axios.get(buildProxiedUrl("/event_timeline"));
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

export const GetPUSBEventById = async (id) => {
  try {
    const response = await axios.get(buildProxiedUrl(`/event_timeline/${id}`));
    return response.data?.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
  return null;
};

export const GetPUSBEventTimeline = async (eventId) => {
  try {
    const response = await axios.get(
      buildProxiedUrl(`/event_timeline/${eventId}/detail`)
    );
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

export const GetPUSBEventTimelineById = async (eventId, timelineId) => {
  try {
    const response = await axios.get(
      buildProxiedUrl(`/event_timeline/${eventId}/detail/${timelineId}`)
    );
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
