import { Link } from "react-router-dom";
import type { UserList } from "../types/UserList";
import "../styles/user-list.css";

interface Props {
  user: UserList;
}

export default function UserListItem({ user }: Props) {
  return (
    <Link to={`/users/${user.id}`} className="user-list-item">
      <img
        src={
          user.avatar
            ? user.avatar
            : "https://via.placeholder.com/48"
        }
        alt="Avatar"
        className="user-avatar"
      />

      <span>@{user.username}</span>
    </Link>
  );
}
