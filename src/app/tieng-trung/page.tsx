import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { chineseResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tiếng Trung cho du học sinh",
  description: "Tài liệu học tiếng Trung cho du học sinh Đài Loan: luyện thi TOCFL, từ vựng, ngữ pháp, tài liệu tự học.",
};

const icons: Record<string, string> = { tocfl: "🗣️", "tu-vung": "📝", "ngu-phap": "📐", "tai-lieu": "📖" };

export default function TiengTrungPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Tiếng Trung cho du học sinh" subtitle="Tài liệu học tiếng Trung toàn diện — từ TOCFL, từ vựng, ngữ pháp đến nguồn học liệu chất lượng." backgroundImage="/images/university-campus.png" breadcrumbs={[{ label: "Tiếng Trung" }]} badge="Tiếng Trung" />
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Học tiếng Trung</span>
              <h2 className="section-title">Nắm vững <span className="gradient-text-gold">tiếng Trung</span> để thành công</h2>
              <p className="section-desc">Tiếng Trung là chìa khóa mở cửa cuộc sống và sự nghiệp tại Đài Loan.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
              {chineseResources.map((r) => (
                <Link key={r.slug} href={`/tieng-trung/${r.slug}`} className="program-card" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                  {r.badge && <span className="badge badge-gold" style={{ position: "absolute", top: "1.25rem", right: "1.25rem" }}>{r.badge}</span>}
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icons[r.slug] || "📋"}</div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.35 }}>{r.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "1.25rem", flex: 1 }}>{r.subtitle}</p>
                  <div style={{ color: "var(--color-gold)", fontSize: "0.85rem", fontWeight: 600 }}>Khám phá ngay →</div>
                </Link>
              ))}
            </div>
            <div className="glass" style={{ marginTop: "4rem", padding: "3rem", borderRadius: "var(--radius-lg)", textAlign: "center", maxWidth: "800px", margin: "4rem auto 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🇹🇼</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Học tiếng Trung tại Đài Loan</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Muốn học hiệu quả nhất? Hãy đến Đài Loan! Môi trường ngôn ngữ thực tế giúp bạn tiến bộ nhanh chóng.</p>
              <Link href="/he-hoc/ngon-ngu" className="btn btn-primary">Tìm hiểu hệ Ngôn ngữ →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
