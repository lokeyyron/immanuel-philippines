import EditorialPage from "../components/EditorialPage";

export const metadata = { title: "Blogs · Immanuel Church PH" };

const posts = [
  { tag: "Devotional", title: "Faith for the ordinary days", body: "Short reflections from the Immanuel family for the questions, joys, and choices in front of you.", date: "Coming soon" },
  { tag: "Community", title: "A place to belong in Iligan", body: "Stories of friendship, prayer, and the small ways a church family makes room for one another.", date: "Coming soon" },
  { tag: "Messages", title: "Carry hope into your week", body: "Follow along with the ideas and Scriptures behind our latest messages and gatherings.", date: "Coming soon" },
];

export default function BlogsPage() {
  return <EditorialPage eyebrow="Immanuel / Journal" title="A word for" accent="where you are." description="Thoughts, stories, and simple practices to help you follow Jesus in everyday life.">
    <div className="route-card-grid">
      {posts.map((post, index) => <article className="route-card blog-card" key={post.title}><div className="route-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{post.date}</span></div><p className="route-card-tag">{post.tag}</p><h2>{post.title}</h2><p>{post.body}</p><span className="route-card-arrow" aria-hidden="true">↗</span></article>)}
    </div>
  </EditorialPage>;
}
