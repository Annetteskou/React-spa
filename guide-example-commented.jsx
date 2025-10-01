// 📁 pages/CreatePage.jsx - GUIDENS EKSEMPEL (med kommentarer)
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  // State til at gemme form data
  const [caption, setCaption] = useState(""); // Caption tekst fra input felt
  const [image, setImage] = useState(""); // Image URL fra input felt
  const navigate = useNavigate(); // Hook til navigation

  // Funktion der kaldes når formen submitter
  async function handleSubmit(event) {
    event.preventDefault(); // Forhindrer default browser form submission

    // Simpel validation - tjek om felter er udfyldt
    if (!caption.trim() || !image.trim()) {
      console.error("Alle felter skal udfyldes");
      return; // Stop hvis validation fejler
    }

    // Opret post objekt med data fra formen
    const newPost = {
      caption: caption.trim(), // Fjern whitespace fra caption
      image: image.trim(), // Fjern whitespace fra image URL
      uid: "fTs84KRoYw5pRZEWCq2Z", // Hardcoded bruger ID
      createdAt: Date.now(), // Timestamp (millisekunder siden 1970)
    };

    // POST request til Firebase
    // PROBLEM: Hardcoded URL - svært at ændre for forskellige miljøer
    const url =
      "https://[dit-projekt-navn]-default-rtdb.firebaseio.com/posts.json";

    // Send data til Firebase
    const response = await fetch(url, {
      method: "POST", // HTTP method for at oprette ny ressource
      body: JSON.stringify(newPost), // Konverter objekt til JSON string
      // PROBLEM: Mangler Content-Type header
    });

    // Håndter response
    if (response.ok) {
      navigate("/"); // Naviger tilbage til home page ved success
    } else {
      console.error("Fejl ved oprettelse af post");
      // PROBLEM: Ingen fejlbesked til brugeren
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Opret nyt post</h1>

        {/* Form med controlled inputs */}
        <form className="form-grid" onSubmit={handleSubmit}>
          {/* Caption input felt */}
          <label htmlFor="caption">Caption</label>
          <input
            id="caption"
            type="text"
            value={caption} // Controlled input - værdi kommer fra state
            placeholder="Skriv en caption..."
            onChange={(e) => setCaption(e.target.value)} // Opdater state når bruger skriver
          />

          {/* Image URL input felt */}
          <label htmlFor="image-url">Image URL</label>
          <input
            id="image-url"
            type="url"
            value={image} // Controlled input - værdi kommer fra state
            placeholder="Indsæt billede URL..."
            onChange={(e) => setImage(e.target.value)} // Opdater state når bruger skriver
          />

          {/* Image preview */}
          <label htmlFor="image-preview">Preview</label>
          <img
            id="image-preview"
            className="image-preview"
            src={
              image || "https://placehold.co/600x400?text=Indsæt+billede+URL"
            } // Fallback hvis image er tom
            alt="Preview"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Ugyldigt+billede")
            } // Fallback for ugyldig URL
          />

          {/* Submit knap */}
          <div className="btns">
            <button type="submit">Gem</button>
            {/* PROBLEM: Ingen cancel knap - brugeren kan ikke nemt gå tilbage */}
          </div>
        </form>
      </div>
    </section>
  );
}

/*
PROBLEMER MED GUIDENS EKSEMPEL:

1. HARDCODED URL
   - Firebase URL er hardcoded i koden
   - Svært at ændre for forskellige miljøer (dev, prod)
   - Løsning: Brug environment variables

2. MANGEL PÅ ERROR HANDLING
   - Kun console.error - brugeren ser ikke fejlen
   - Ingen try-catch blocks
   - Løsning: Alert messages eller error state

3. INGEN LOADING STATE
   - Brugeren ved ikke om formen bliver submitted
   - Kan klikke submit flere gange
   - Løsning: isSubmitting state med disabled knapper

4. MANGEL PÅ CANCEL FUNKTIONALITET
   - Ingen nem måde at gå tilbage
   - Løsning: Cancel knap

5. MANGEL PÅ CONTENT-TYPE HEADER
   - Firebase kan have problemer med at parse JSON
   - Løsning: Tilføj "Content-Type": "application/json"

6. KODEDUPLIKERING
   - Samme form logik vil blive duplikeret i UpdatePage
   - Løsning: Opret PostForm komponent

7. MANGEL PÅ VALIDATION FEEDBACK
   - Kun console.error - brugeren ser ikke validation fejl
   - Løsning: Error state med visuelt feedback

DIN IMPLEMENTERING LØSER ALLE DISSE PROBLEMER! 🎉
*/
