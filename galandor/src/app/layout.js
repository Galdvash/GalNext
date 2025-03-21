import "@/lib/styles/globals.css";

export const metadata = {
  title: "My Next App",
  description: "Application with MongoDB connection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
