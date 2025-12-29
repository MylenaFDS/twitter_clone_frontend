import api from "./api";

const API_BASE_URL = "http://127.0.0.1:9000";

function getAuthHeaders() {
  const token = localStorage.getItem("access");
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function toggleFollow(userId: number) {
  const { data } = await api.post(`/follows/${userId}/`);
  return data; // { following: true | false }
}

export async function getFollowers(userId: number) {
  const res = await fetch(
    `${API_BASE_URL}/api/users/${userId}/followers/`,
    { headers: getAuthHeaders() }
  );

  if (!res.ok) throw new Error("Erro ao carregar seguidores");
  return res.json();
}

export async function getFollowing(userId: number) {
  const res = await fetch(
    `${API_BASE_URL}/api/users/${userId}/following/`,
    { headers: getAuthHeaders() }
  );

  if (!res.ok) throw new Error("Erro ao carregar seguindo");
  return res.json();
}
