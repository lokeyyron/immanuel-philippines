import MemberPortalChrome from "./MemberPortalChrome";
import MemberPortalFooter from "./MemberPortalFooter";

export const metadata = {
  title: "Member space | Immanuel Church PH",
  description: "A private member space for the Immanuel Church PH family.",
};

export default function MemberPortalLayout({ children }) {
  return (
    <div className="member-portal-app">
      <MemberPortalChrome />
      {children}
      <MemberPortalFooter />
    </div>
  );
}
