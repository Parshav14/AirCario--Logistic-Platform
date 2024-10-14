import api from "./api";

export const estimatePrice = async (bookingDetails) => {
  try {
    const response = await api.post("/pricing/estimate", bookingDetails);
    return response.data.price;
  } catch (error) {
    console.error("Error estimating price:", error);
    throw error;
  }
};
