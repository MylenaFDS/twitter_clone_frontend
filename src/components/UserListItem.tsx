import { Link } from "react-router-dom";
import type { UserList } from "../types/UserList";
import "../styles/user-list.css";

const API_BASE_URL = "http://127.0.0.1:9000";

interface Props {
  user: UserList;
}

export default function UserListItem({ user }: Props) {
  return (
    <Link to={`/users/${user.id}`} className="user-list-item">
      <img
        src={
          user.avatar
            ? `${API_BASE_URL}${user.avatar}`
            : "https://via.placeholder.com/48"
        }
        alt="Avatar"
        className="user-avatar"
      />

      <span>@{user.username}</span>
    </Link>
  );
}
