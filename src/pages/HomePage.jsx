import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      try {
        // Firebase URL fra environment variable
        const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts.json`;
        const response = await fetch(url);
        const data = await response.json();

        // Fra objekt til array
        const postsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        console.log("Posts array:", postsArray);
        setPosts(postsArray);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  // Filtrer posts baseret på søgning
  const filteredPosts = posts.filter((post) =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sortér posts
  const sortedPosts = [...filteredPosts].sort((postA, postB) => {
    if (sortBy === "createdAt") {
      return postB.createdAt - postA.createdAt; // Nyeste først
    }
    if (sortBy === "caption") {
      return postA.caption.localeCompare(postB.caption);
    }
    return 0;
  });

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
      <h1>Mine Posts</h1>

      <form className="grid-filter" role="search">
        <label>
          Søg i captions
          <input
            type="text"
            placeholder="Søg..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        <label>
          Sortér efter
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Dato (nyeste først)</option>
            <option value="caption">Caption (A-Z)</option>
          </select>
        </label>
      </form>

      <section className="grid">
        {sortedPosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </section>
  );
}
