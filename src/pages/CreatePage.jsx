import { useState } from "react";
import { useNavigate } from "react-router";
import PostForm from "../components/PostForm";

export default function CreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function createPost(formData) {
    setIsSubmitting(true);

    const newPost = {
      ...formData,
      uid: "fTs84KRoYw5pRZEWCq2Z", // Hardcoded indtil vi har authentication
      createdAt: Date.now(), // Timestamp for sortering
    };

    // Firebase URL fra environment variable
    const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts.json`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.log("Post gemt succesfuldt!");
        navigate("/");
      } else {
        console.error("Fejl ved at gemme post");
        alert("Der opstod en fejl ved oprettelse af post");
      }
    } catch (error) {
      console.error("Fejl:", error);
      alert("Netværksfejl - prøv igen");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Opret nyt post</h1>
        <PostForm
          savePost={createPost}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
        />
      </div>
    </section>
  );
}
