import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog not found · Immanuel Church PH" };
  return {
    title: `${post.title} · Immanuel Church PH`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main id="main-content" className="blog-post-page">
      <section className="blog-post-hero">
        <div className="blog-post-grid" aria-hidden="true" />
        <div className="blog-post-accent" aria-hidden="true" />
        <div className="blog-post-hero-inner">
          <Link className="blog-post-back" href="/blogs"><span aria-hidden="true">↖</span> Back to all stories</Link>
          <p className="blog-index-kicker"><span /> {post.category}</p>
          <h1>{post.title}</h1>
          <p className="blog-post-lede">{post.excerpt}</p>
        </div>
      </section>

      <article className="blog-post-article">
        <header className="blog-post-meta">
          <div><span>Written by</span><strong>{post.author}</strong></div>
          <div><span>Published</span><strong>{post.date}</strong></div>
        </header>
        <div className="blog-post-body">
          <div className="blog-post-prose">
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <aside className="blog-post-callout">
            <span className="blog-index-kicker"><span /> A thought to carry</span>
            <p>{post.pullQuote}</p>
          </aside>
        </div>
        <footer className="blog-post-footer">
          <Link className="blog-post-back" href="/blogs"><span aria-hidden="true">↖</span> Read another story</Link>
          <Link className="blog-post-next" href="/blogs"><span>Back to the journal</span><span aria-hidden="true">↗</span></Link>
        </footer>
      </article>
    </main>
  );
}
