// Server example - dont need for an API endpoint
import { connectToMongo, Post } from "@/lib/database";

async function getPosts() {
  await connectToMongo();

  const posts = await Post.find({}).sort({ createdAt: -1 });

  if (posts) {
    return posts;
  }

  return [];
}

export default async function HomePage() {
  const posts = await getPosts();

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
