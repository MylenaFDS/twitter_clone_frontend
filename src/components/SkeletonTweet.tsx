import "../styles/skeleton.css";

export default function SkeletonTweet() {
  return (
    <div className="skeleton-tweet">
      <div className="skeleton-avatar" />

      <div className="skeleton-content">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    </div>
  );
}
