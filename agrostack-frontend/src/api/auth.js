import api from "./api";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const requestPasswordReset = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async ({ token, password }) => {
  const res = await api.post("/auth/reset-password", { token, password });
  return res.data;
};

// utils/auth.js
export const getUsername = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload);
    
    return payload.sub; // username
  } catch {
    return null;
  }
};
