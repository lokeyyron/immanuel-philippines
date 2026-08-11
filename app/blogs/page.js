import BlogIndex from "./BlogIndex";
import { blogPosts } from "./data";

export const metadata = {
  title: "Blogs · Immanuel Church PH",
  description: "Devotionals, stories, and reflections from the Immanuel Church PH family.",
};

export default function BlogsPage() {
  return <BlogIndex posts={blogPosts} />;
}
