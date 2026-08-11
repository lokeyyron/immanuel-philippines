import BlogIndex from "../blogs/BlogIndex";
import { blogPosts } from "../blogs/data";

export const metadata = {
  title: "Journal · Immanuel Church PH",
  description: "Devotionals, stories, and reflections from the Immanuel Church PH family.",
};

export default function JournalPage() {
  return <BlogIndex posts={blogPosts} />;
}
