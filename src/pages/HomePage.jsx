// Importerer React hooks og PostCard komponenten
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  // State til at gemme alle posts fra Firebase
  const [posts, setPosts] = useState([]);

  // State til søgefeltet - hvad brugeren skriver
  const [searchQuery, setSearchQuery] = useState("");

  // State til sortering - "createdAt" eller "caption"
  const [sortBy, setSortBy] = useState("createdAt");

  // State til at vise loading mens data hentes
  const [loading, setLoading] = useState(true);

  // useEffect kører når komponenten loader første gang
  useEffect(() => {
    // Async funktion til at hente posts fra Firebase
    async function getPosts() {
      setLoading(true); // Vis loading state
      try {
        // Hent Firebase URL fra environment variable (.env fil)
        const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts.json`;

        // Fetch data fra Firebase
        const response = await fetch(url);
        const data = await response.json();

        // Firebase gemmer data som objekt med auto-genererede keys
        // Vi konverterer det til et array så vi kan bruge .map()
        const postsArray = Object.keys(data).map((key) => ({
          id: key, // Firebase key bliver til id
          ...data[key], // Resten af post data (caption, image, etc.)
        }));

        console.log("Posts array:", postsArray);
        setPosts(postsArray); // Gem posts i state
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false); // Skjul loading state
      }
    }
    getPosts(); // Kald funktionen
  }, []); // Tom dependency array = kør kun én gang

  // Filtrer posts baseret på hvad brugeren søger efter
  const filteredPosts = posts.filter((post) =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sortér de filtrerede posts
  const sortedPosts = [...filteredPosts].sort((postA, postB) => {
    if (sortBy === "createdAt") {
      // Sorter efter dato - nyeste først (større timestamp først)
      return postB.createdAt - postA.createdAt;
    }
    if (sortBy === "caption") {
      // Sorter alfabetisk efter caption (A-Z)
      return postA.caption.localeCompare(postB.caption);
    }
    return 0; // Ingen sortering
  });

  // Hvis data stadig hentes, vis loading screen
  if (loading) {
    return (
      <section className="page">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  // Hovedindhold når data er loaded
  return (
    <section className="page">
      <h1>Mine Posts</h1>

      {/* Søgning og sortering form */}
      <form className="grid-filter" role="search">
        <label>
          Søg i captions
          <input
            type="text"
            placeholder="Søg..."
            value={searchQuery} // Controlled input - værdi kommer fra state
            onChange={(e) => setSearchQuery(e.target.value)} // Opdater state når bruger skriver
          />
        </label>

        <label>
          Sortér efter
          <select
            value={sortBy} // Controlled select - værdi kommer fra state
            onChange={(e) => setSortBy(e.target.value)} // Opdater state når bruger vælger
          >
            <option value="createdAt">Dato (nyeste først)</option>
            <option value="caption">Caption (A-Z)</option>
          </select>
        </label>
      </form>

      {/* Grid med alle posts */}
      <section className="grid">
        {sortedPosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </section>
  );
}
