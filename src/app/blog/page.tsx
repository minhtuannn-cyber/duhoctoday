import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import { getPosts } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Blog du học Đài Loan",
  description: "Tin tức, bài viết và chia sẻ kinh nghiệm du học Đài Loan từ đội ngũ DuHocToday.",
};

// Revalidate every 60 seconds so new posts appear quickly
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

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
            <BlogList posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
