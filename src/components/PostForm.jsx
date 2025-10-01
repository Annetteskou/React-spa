// Importerer React hooks
import { useState, useEffect } from "react";

// PostForm komponenten - kan bruges til både create og update
export default function PostForm({
  savePost, // Funktion der kaldes når formen submitter
  post, // Post data (kun til update mode)
  isSubmitting = false, // Loading state fra parent komponent
  onCancel, // Funktion der kaldes når brugeren annullerer
}) {
  // State til form felter
  const [caption, setCaption] = useState(""); // Caption tekst
  const [image, setImage] = useState(""); // Image URL
  const [errorMessage, setErrorMessage] = useState(""); // Valideringsfejl

  // useEffect kører når post prop ændres (for update mode)
  useEffect(() => {
    if (post?.caption && post?.image) {
      // Pre-udfyld form felter med eksisterende post data
      setCaption(post.caption);
      setImage(post.image);
    }
  }, [post]);

  // Handler funktioner der også rydder error messages
  function handleCaptionChange(e) {
    setCaption(e.target.value); // Opdater caption state
    if (errorMessage) setErrorMessage(""); // Ryd error hvis der er en
  }

  function handleImageChange(e) {
    setImage(e.target.value); // Opdater image state
    if (errorMessage) setErrorMessage(""); // Ryd error hvis der er en
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Simpel validation
    if (!caption.trim()) {
      setErrorMessage("Caption er påkrævet");
      return;
    }

    if (!image.trim()) {
      setErrorMessage("Billede URL er påkrævet");
      return;
    }

    // Clear error og gem
    setErrorMessage("");
    const formData = {
      caption: caption.trim(),
      image: image.trim(),
    };

    // Kald den funktion der blev sendt som prop
    savePost(formData);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label htmlFor="caption">Caption</label>
      <input
        id="caption"
        type="text"
        value={caption}
        placeholder="Skriv en caption..."
        onChange={handleCaptionChange}
        disabled={isSubmitting}
        required
      />

      <label htmlFor="image-url">Image URL</label>
      <input
        id="image-url"
        type="url"
        value={image}
        placeholder="Indsæt billede URL..."
        onChange={handleImageChange}
        disabled={isSubmitting}
        required
      />

      <label htmlFor="image-preview">Preview</label>
      <img
        id="image-preview"
        className="image-preview"
        src={image || "https://placehold.co/600x400?text=Indsæt+billede+URL"}
        alt="Preview"
        onError={(e) => {
          e.target.src = "https://placehold.co/600x400?text=Ugyldigt+billede";
        }}
      />

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="btns">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-cancel"
            disabled={isSubmitting}
          >
            Annuller
          </button>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Gemmer..." : "Gem"}
        </button>
      </div>
    </form>
  );
}
