import api from "./api";

export const matchDriver = async (booking) => {
  try {
    const response = await api.post("/matching", booking);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
