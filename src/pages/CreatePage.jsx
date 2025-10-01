// Importerer React hooks og komponenter
import { useState } from "react";
import { useNavigate } from "react-router";
import PostForm from "../components/PostForm";

export default function CreatePage() {
  // State til at tracke om formen bliver submitted (for loading state)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook til at navigere mellem sider
  const navigate = useNavigate();

  // Funktion der kaldes når PostForm bliver submitted
  async function createPost(formData) {
    setIsSubmitting(true); // Vis loading state

    // Opret nyt post objekt med data fra formen
    const newPost = {
      ...formData, // Spread caption og image fra formData
      uid: "fTs84KRoYw5pRZEWCq2Z", // Hardcoded bruger ID (indtil vi har authentication)
      createdAt: Date.now(), // Timestamp for sortering (millisekunder siden 1970)
    };

    // Firebase URL fra environment variable (.env fil)
    const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts.json`;

    try {
      // Send POST request til Firebase for at oprette nyt post
      const response = await fetch(url, {
        method: "POST", // HTTP method for at oprette ny ressource
        headers: {
          "Content-Type": "application/json", // Fortæl Firebase at vi sender JSON
        },
        body: JSON.stringify(newPost), // Konverter objekt til JSON string
      });

      if (response.ok) {
        console.log("Post gemt succesfuldt!");
        navigate("/"); // Naviger tilbage til home page
      } else {
        console.error("Fejl ved at gemme post");
        alert("Der opstod en fejl ved oprettelse af post");
      }
    } catch (error) {
      console.error("Fejl:", error);
      alert("Netværksfejl - prøv igen");
    } finally {
      setIsSubmitting(false); // Skjul loading state
    }
  }

  // Funktion der kaldes når brugeren klikker "Annuller"
  function handleCancel() {
    navigate("/"); // Naviger tilbage til home page
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Opret nyt post</h1>
        {/* PostForm komponenten håndterer selve formen */}
        <PostForm
          savePost={createPost} // Send createPost funktion som prop
          isSubmitting={isSubmitting} // Send loading state som prop
          onCancel={handleCancel} // Send cancel handler som prop
        />
      </div>
    </section>
  );
}
