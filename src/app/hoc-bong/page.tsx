import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScholarshipCard from "@/components/ScholarshipCard";
import Link from "next/link";
import { getMockScholarships } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Học bổng du học Đài Loan",
  description: "Tổng hợp học bổng du học Đài Loan: học bổng chính phủ MOE, HES, học bổng từ trường, và các nguồn tài trợ khác.",
};

export default async function HocBongPage() {
  const scholarships = getMockScholarships();

  const types = [
    { key: "all", label: "Tất cả", href: "/hoc-bong" },
    { key: "chinh-phu", label: "🏛 Chính phủ", href: "/hoc-bong/chinh-phu" },
    { key: "tu-truong", label: "🏫 Từ trường", href: "/hoc-bong/tu-truong" },
    { key: "hes", label: "🗣 HES Ngôn ngữ", href: "/hoc-bong/hes" },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero title="Học bổng du học Đài Loan" subtitle="Khám phá hàng chục chương trình học bổng hấp dẫn — từ toàn phần chính phủ đến học bổng ngôn ngữ." backgroundImage="/images/scholarship-hero.png" breadcrumbs={[{ label: "Học bổng" }]} badge="💰 Học bổng" />
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Chương trình học bổng</span>
              <h2 className="section-title">Tìm <span className="gradient-text-gold">học bổng</span> phù hợp với bạn</h2>
            </div>

            {/* Filter buttons */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {types.map((t) => (
                <Link key={t.key} href={t.href} className={`btn ${t.key === "all" ? "btn-primary" : "btn-outline"}`} style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}>
                  {t.label}
                </Link>
              ))}
            </div>

            {/* Scholarship grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
              {scholarships.map((sc) => (
                <ScholarshipCard key={sc.id} scholarship={sc} />
              ))}
            </div>

            {/* Experience link */}
            <div className="glass" style={{ marginTop: "4rem", padding: "3rem", borderRadius: "var(--radius-lg)", textAlign: "center", maxWidth: "800px", margin: "4rem auto 0" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Bí quyết xin học bổng thành công</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Tìm hiểu cách viết SOP, tiêu chí đánh giá, và những sai lầm cần tránh khi apply học bổng.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/hoc-bong/kinh-nghiem" className="btn btn-primary">📝 Kinh nghiệm xin học bổng</Link>
                <Link href="/tu-van" className="btn btn-outline">Tư vấn miễn phí</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
