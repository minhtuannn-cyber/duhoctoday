import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import { getMockPosts } from "@/lib/notion";

export function generateStaticParams() {
  return getMockPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getMockPosts().find((p) => p.slug === slug);
  if (!post) return { title: "Bài viết không tồn tại" };
  return { title: `${post.title} | DuHocToday`, description: post.excerpt };
}

export default async function BaiVietPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getMockPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <PageHero title={post.title} subtitle={post.excerpt} backgroundImage={post.coverImage || "/images/hero-banner.png"} breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]} badge={post.category} compact />
        <section className="section">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", fontSize: "0.85rem", color: "var(--color-text-dim)" }}>
              <span className="badge badge-primary">{post.category}</span>
              <span>⏱ {post.readTime}</span>
              <span>📅 {post.publishedAt}</span>
            </div>
            {post.coverImage && (
              <div style={{ position: "relative", height: "400px", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "2rem" }}>
                <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} />
              </div>
            )}
            <article style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>{post.excerpt}</p>
              <div className="alert alert-info">
                💡 Nội dung đầy đủ sẽ được cập nhật khi kết nối với Notion CMS. Hiện tại đang hiển thị bản tóm tắt.
              </div>
            </article>
            <div className="divider" style={{ margin: "3rem 0" }} />
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <Link href="/tu-van" className="btn btn-primary">Đăng ký tư vấn du học →</Link>
            </div>
          </div>
        </section>
        {related.length > 0 && (
          <section className="section" style={{ background: "var(--color-bg-card)" }}>
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Bài viết <span className="gradient-text">liên quan</span></h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {related.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
