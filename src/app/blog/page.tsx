import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import { getMockPosts } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Blog du học Đài Loan",
  description: "Tin tức, bài viết và chia sẻ kinh nghiệm du học Đài Loan từ đội ngũ DuHocToday.",
};

export default async function BlogPage() {
  const posts = getMockPosts();

  return (
    <>
      <Header />
      <main>
        <PageHero title="Blog du học Đài Loan" subtitle="Tin tức mới nhất, bài viết hướng dẫn và chia sẻ kinh nghiệm từ du học sinh." backgroundImage="/images/hero-banner.png" breadcrumbs={[{ label: "Blog" }]} badge="📝 Blog" />
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Bài viết mới</span>
              <h2 className="section-title">Khám phá <span className="gradient-text">bài viết</span> mới nhất</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
