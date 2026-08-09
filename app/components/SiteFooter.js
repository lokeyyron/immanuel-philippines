import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/assets/immanuel-logo.png" alt="" />
        <p>Immanuel Church PH</p>
      </div>
      <div className="footer-message">
        <span>God with us.</span>
        <a href="https://www.youtube.com/@ImmanuelChurchIligan" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
      </div>
      <div className="footer-links">
        <a href="https://www.facebook.com/immanuelchurchiligan" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
        <a href="https://www.youtube.com/@ImmanuelChurchIligan" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
        <Link href="/events#visit">Visit us</Link>
        <a href="#main-content">Back to top ↑</a>
      </div>
      <p className="copyright">© 2024 Immanuel Church PH · Iligan City</p>
    </footer>
  );
}
