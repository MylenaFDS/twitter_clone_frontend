import api from "./api";

/**
 * Seguir / deixar de seguir usuário
 * POST /api/follows/:id/
 */
export async function toggleFollow(userId: number) {
  const { data } = await api.post(`/api/follows/${userId}/`);
  return data; // { following: true | false }
}

/**
 * Listar seguidores
 * GET /api/users/:id/followers/
 */
export async function getFollowers(userId: number) {
  const { data } = await api.get(`/api/users/${userId}/followers/`);
  return data;
}

/**
 * Listar seguindo
 * GET /api/users/:id/following/
 */
export async function getFollowing(userId: number) {
  const { data } = await api.get(`/api/users/${userId}/following/`);
  return data;
}
