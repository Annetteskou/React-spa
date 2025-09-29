import { useNavigate } from "react-router";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post, disableNavigation = false }) {
  const navigate = useNavigate();

  function handleClick() {
    if (!disableNavigation) {
      navigate(`/posts/${post.id}`);
    }
  }

  return (
    <article
      className={`post-card ${!disableNavigation ? "clickable" : ""}`}
      onClick={handleClick}
    >
      <UserAvatar uid={post.uid} />
      <img src={post.image} alt={post.caption} />
      <h2>{post.caption}</h2>
    </article>
  );
}
