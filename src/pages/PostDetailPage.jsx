import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PostCard from "../components/PostCard";

export default function PostDetailPage() {
  const [post, setPost] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      // Firebase URL fra environment variable
      const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${
        params.id
      }.json`;
      const response = await fetch(url);
      const postData = await response.json();
      setPost({ id: params.id, ...postData });
    }
    getPost();
  }, [params.id]);

  function handleUpdate() {
    navigate(`/posts/${params.id}/update`);
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Er du sikker på du vil slette dette post?"
    );

    if (confirmDelete) {
      setIsDeleting(true);

      try {
        // Firebase URL fra environment variable
        const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${
          params.id
        }.json`;
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Post slettet succesfuldt");
          navigate("/");
        } else {
          console.error("Fejl ved sletning af post");
          alert("Der opstod en fejl ved sletning");
        }
      } catch (error) {
        console.error("Netværksfejl:", error);
        alert("Netværksfejl - prøv igen");
      } finally {
        setIsDeleting(false);
      }
    }
  }

  return (
    <section className="page" id="post-page">
      <div className="container">
        {post.id && <PostCard post={post} disableNavigation={true} />}

        <div className="btns">
          <button
            onClick={handleUpdate}
            className="btn-outline"
            disabled={isDeleting}
          >
            Redigér
          </button>
          <button
            onClick={handleDelete}
            className="btn-outline btn-delete"
            disabled={isDeleting}
          >
            {isDeleting ? "Sletter..." : "Slet"}
          </button>
        </div>
      </div>
    </section>
  );
}
