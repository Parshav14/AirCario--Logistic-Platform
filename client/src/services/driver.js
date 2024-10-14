import api from "./api";

export const getDriverJobs = async () => {
  try {
    const response = await api.get("/driver/jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching driver jobs:", error);
    throw error;
  }
};

export const updateJobStatus = async (jobId, status) => {
  try {
    const response = await api.put(`/driver/jobs/${jobId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error;
  }
};

export const updateDriverLocation = async (latitude, longitude) => {
  try {
    const response = await api.post("/driver/location", {
      latitude,
      longitude,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating driver location:", error);
    throw error;
  }
};
