import "../styles/globals.css";
import Nav from "../components/Nav";

export const metadata = {
  title: "Vision AI — Where Imagination Meets Intelligence",
  description: "Text → Image and Text → Video. Fast. Clean. SFW.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
