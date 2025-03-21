"use client";

import React from "react";

import { useAuth } from "@/lib/hooks";

export default function AdminPage() {
  const { isSignedIn, login } = useAuth();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

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
    } else {
      const data = await res.json();
      setMessage(`שגיאה: ${data.error}`);
    }
  };

  if (!isSignedIn) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>לוח ניהול</h1>
        <p>אנא התחבר כדי להמשיך</p>
        {/* Add your authenticated content or redirect here */}
        <form>
          <div>
            <label>שם משתמש:</label>
            <input
              type="text"
              value={credentials?.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>
          <div>
            <label>סיסמה:</label>
            <input
              type="password"
              value={credentials?.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button
            onClick={() => {
              login(credentials.username, credentials.password);
            }}
          >
            התחבר
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>לוח ניהול</h1>
      <button onClick={() => login()}>התנתק</button>
      <form onSubmit={handleSubmit}>
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
