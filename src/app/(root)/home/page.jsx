// Client example
"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        // Add error handling
        alert("שגיאה בטעינת הפוסטים");
      }
      setLoading(false);
    }

    setLoading(true);
    fetchPosts();

    return () => {
      // Cleanup
      setPosts([]);
      setLoading(false);
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              margin: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "50%",
              textAlign: "center",
            }}
          >
            <p>טוען פוסטים...</p>
          </div>
          ;
        </div>
        ;
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>פוסטים</h1>
      {posts.length === 0 ? (
        <p>אין פוסטים זמינים</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              margin: "1rem 0",
              padding: "1rem",
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
