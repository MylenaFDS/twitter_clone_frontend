import api from "./api";

export async function toggleFollow(userId: number) {
  const { data } = await api.post(`/follows/${userId}/`);
  return data; // { following: true | false }
}

export async function getFollowers(userId: number) {
  const { data } = await api.get(`/follows/${userId}/followers/`);
  return data;
}

export async function getFollowing(userId: number) {
  const { data } = await api.get(`/follows/${userId}/following/`);
  return data;
}
