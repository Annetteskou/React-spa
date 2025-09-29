import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import PostForm from "../components/PostForm";

export default function UpdatePage() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      if (postData) {
        setPost({ id: params.id, ...postData });
      }
      setLoading(false);
    }
    getPost();
  }, [params.id]);

  async function updatePost(formData) {
    setIsSubmitting(true);

    // Opret opdateret post objekt (kun de felter vi vil opdatere)
    const postToUpdate = {
      ...formData,
      uid: post.uid, // Bevar original uid
    };

    // Firebase URL fra environment variable
    const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${
      params.id
    }.json`;

    try {
      const response = await fetch(url, {
        method: "PATCH", // PATCH opdaterer kun de felter vi sender
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postToUpdate),
      });

      if (response.ok) {
        console.log("Post opdateret succesfuldt!");
        navigate(`/posts/${params.id}`);
      } else {
        alert("Der opstod en fejl ved opdatering");
      }
    } catch (error) {
      console.error("Fejl:", error);
      alert("Netværksfejl - prøv igen");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    navigate(`/posts/${params.id}`);
  }

  if (loading) {
    return (
      <section className="page">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Redigér post</h1>
        <PostForm
          savePost={updatePost}
          post={post}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
        />
      </div>
    </section>
  );
}
