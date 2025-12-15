import api from "./api";

export const login = async (username: string, password: string) => {
  const res = await api.post("/token/", { username, password }); // endpoint correto
  localStorage.setItem("token", res.data.access);
  return res.data;
};

export const register = async (username: string, email: string, password: string) => {
  const res = await api.post("/users/", { username, email, password }); // criação de usuário
  return res.data;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
