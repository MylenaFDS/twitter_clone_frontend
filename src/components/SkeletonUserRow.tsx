import "../styles/skeleton.css";

export default function SkeletonUserRow() {
  return (
    <div className="user-row skeleton">
      <div className="user-info">
        <div className="skeleton-avatar" />
        <div className="skeleton-username" />
      </div>

      <div className="skeleton-btn" />
    </div>
  );
}
