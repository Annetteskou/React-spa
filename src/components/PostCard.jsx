import { useNavigate } from "react-router";
import PropTypes from "prop-types";
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

// PropTypes validation
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }).isRequired,
  disableNavigation: PropTypes.bool,
};
