"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: "2rem", color: "red" }}>
      <h2>אירעה שגיאה</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>נסה שוב</button>
    </div>
  );
}
