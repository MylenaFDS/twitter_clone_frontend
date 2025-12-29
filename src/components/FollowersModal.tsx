import { useEffect, useState } from "react";
import Modal from "./Modal";
import UserListItem from "./UserListItem";
import { getFollowers, getFollowing } from "../services/follows";
import type { UserList } from "../types/UserList";

interface Props {
  userId: number;
  type: "followers" | "following";
  onClose: () => void;
}

export default function FollowersModal({ userId, type, onClose }: Props) {
  const [users, setUsers] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          type === "followers"
            ? await getFollowers(userId)
            : await getFollowing(userId);

        setUsers(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [userId, type]);

  return (
    <Modal
      title={type === "followers" ? "Seguidores" : "Seguindo"}
      onClose={onClose}
    >
      {loading && <p>Carregando...</p>}

      {!loading && users.length === 0 && (
        <p className="empty">Nenhum usuário</p>
      )}

      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </Modal>
  );
}
