import { redirect } from "next/navigation";

export default async function LegacyBlogPostPage({ params }) {
  const { slug } = await params;
  redirect(`/journal/${slug}`);
}
