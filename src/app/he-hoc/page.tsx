import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { studyPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hệ đào tạo du học Đài Loan",
  description: "Tìm hiểu các hệ đào tạo du học Đài Loan: Ngôn ngữ, Tự túc, Dự bị 1+4, Vừa học vừa làm, Hoa Kiều, INTENSE.",
};

const icons: Record<string, string> = { "ngon-ngu": "📚", "tu-tuc": "🎓", "du-bi": "📖", vhvl: "💼", "hoa-kieu": "🏮", intense: "🌍" };

export default function HeHocPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Hệ đào tạo du học Đài Loan"
          subtitle="Khám phá các hệ đào tạo đa dạng — từ ngôn ngữ đến chính quy, vừa học vừa làm và nhiều hơn nữa."
          backgroundImage="/images/university-campus.png"
          breadcrumbs={[{ label: "Hệ đào tạo" }]}
          badge="Hệ đào tạo"
        />
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Các hệ đào tạo</span>
              <h2 className="section-title">Chọn <span className="gradient-text">hệ đào tạo</span> phù hợp với bạn</h2>
              <p className="section-desc">Đài Loan có nhiều hệ đào tạo đa dạng, phù hợp với mọi đối tượng du học sinh.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
              {studyPrograms.map((p) => (
                <Link key={p.slug} href={`/he-hoc/${p.slug}`} className="program-card" style={{ position: "relative" }}>
                  {p.badge && <span className="badge badge-primary" style={{ position: "absolute", top: "1.25rem", right: "1.25rem" }}>{p.badge}</span>}
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icons[p.slug] || "📋"}</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{p.subtitle}</p>
                  <div style={{ color: "var(--color-primary)", fontSize: "0.85rem", fontWeight: 600 }}>Tìm hiểu chi tiết →</div>
                </Link>
              ))}
            </div>
            <div className="glass" style={{ marginTop: "4rem", padding: "3rem", borderRadius: "var(--radius-lg)", textAlign: "center", maxWidth: "800px", margin: "4rem auto 0" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Chưa biết chọn hệ nào?</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Đội ngũ tư vấn DuHocToday sẽ giúp bạn phân tích điều kiện và chọn hệ phù hợp nhất. Hoàn toàn miễn phí!</p>
              <Link href="/tu-van" className="btn btn-primary">Nhận tư vấn miễn phí →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
