import api from "./api";

export async function login(username: string, password: string) {
  const response = await api.post("/token/", {
    username,
    password,
  });

  localStorage.setItem("token", response.data.access);
  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
}

