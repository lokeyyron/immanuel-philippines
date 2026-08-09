import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "../styles.css";

export const metadata = {
  title: "Immanuel Church PH",
  description: "Immanuel Church PH — a church community in Iligan City growing in faith, hope, and love.",
  icons: { icon: "/assets/favicon2.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
