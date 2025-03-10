import apiClient from "./apiClient";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  await apiClient.post("/auth/logout");
};
