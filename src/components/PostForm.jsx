import { useState, useEffect } from "react";

export default function PostForm({
  savePost,
  post,
  isSubmitting = false,
  onCancel,
}) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hvis post prop findes, udfyld form (for update mode)
  useEffect(() => {
    if (post?.caption && post?.image) {
      setCaption(post.caption);
      setImage(post.image);
    }
  }, [post]);

  // Clear error message når brugeren begynder at skrive
  function handleCaptionChange(e) {
    setCaption(e.target.value);
    if (errorMessage) setErrorMessage("");
  }

  function handleImageChange(e) {
    setImage(e.target.value);
    if (errorMessage) setErrorMessage("");
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
