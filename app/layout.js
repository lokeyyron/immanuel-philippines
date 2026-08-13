import PublicChrome from "./components/PublicChrome";
import ScrollAtmosphere from "./components/ScrollAtmosphere";
import "../styles.css";

export const metadata = {
  title: "Immanuel Church PH",
  description: "Immanuel Church PH — a church community in Iligan City growing in faith, hope, and love.",
  icons: {
    icon: { url: "/favicon-immanuel-v3.png", type: "image/png" },
    shortcut: "/favicon-immanuel-v3.png",
    apple: "/favicon-immanuel-v3.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollAtmosphere />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
