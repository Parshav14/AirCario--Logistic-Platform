import api from "./api";

export const login = async (email, password, role) => {
  try {
    const response = await api.post("/auth/login", { email, password, role });
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
};

export const signUp = async (name, email, password, role) => {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "An error occurred during signup"
    );
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};
