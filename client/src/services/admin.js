import api from "./api";

export const getDrivers = async () => {
  try {
    const response = await api.get("/admin/drivers");
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error.response?.data || error.message;
  }
};

export const getBookings = async () => {
  try {
    const response = await api.get("/admin/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error.response?.data || error.message;
  }
};

export const getAnalytics = async () => {
  try {
    const response = await api.get("/admin/analytics");
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error.response?.data || error.message;
  }
};
