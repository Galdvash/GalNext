"use client";
import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = btoa(`${username}:${password}`);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setMessage("הפוסט נוצר בהצלחה!");
      setTitle("");
      setContent("");
      setUsername("");
      setPassword("");
    } else {
      const data = await res.json();
      setMessage(`שגיאה: ${data.error}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>לוח ניהול</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משתמש אדמין:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>סיסמת אדמין:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>כותרת הפוסט:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>תוכן הפוסט:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">צור פוסט</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
