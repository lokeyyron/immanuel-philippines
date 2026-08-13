import Link from "next/link";

export default function MemberPortalFooter() {
  return (
    <footer className="member-portal-footer">
      <div className="member-portal-footer-grid">
        <div>
          <p className="member-portal-footer-kicker">IMMANUEL / MEMBERS</p>
          <h2>A little closer<br /><em>together.</em></h2>
        </div>
        <div className="member-portal-footer-copy">
          <p>A private home base for the people who call Immanuel Church PH family.</p>
          <div className="member-portal-footer-links">
            <Link href="/members/portal">Dashboard <span aria-hidden="true">↗</span></Link>
            <Link href="/members/portal/profile">Profile <span aria-hidden="true">↗</span></Link>
            <Link href="/give">Give <span aria-hidden="true">↗</span></Link>
            <Link href="/">Public site <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
      <div className="member-portal-footer-bottom">
        <span>Private member space · Iligan City</span>
        <span>© {new Date().getFullYear()} Immanuel Church PH</span>
      </div>
    </footer>
  );
}
