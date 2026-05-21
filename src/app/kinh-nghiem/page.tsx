import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { experienceGuides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kinh nghiệm du học Đài Loan",
  description: "Tổng hợp kinh nghiệm du học Đài Loan: chuẩn bị hồ sơ, chọn ngành, chi phí, tìm nhà ở, làm thêm, cuộc sống.",
};

const icons: Record<string, string> = { "ho-so": "📋", "chon-nganh": "🎯", "chi-phi": "💳", "nha-o": "🏠", "lam-them": "💼", "cuoc-song": "🌏", "van-hoa": "🎌", "hoi-dap": "❓" };

export default function KinhNghiemPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Kinh nghiệm du học Đài Loan" subtitle="Tổng hợp kinh nghiệm thực tế — từ chuẩn bị hồ sơ đến cuộc sống tại Đài Loan." backgroundImage="/images/taiwan-life.png" breadcrumbs={[{ label: "Kinh nghiệm" }]} badge="Kinh nghiệm" />
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Cẩm nang du học</span>
              <h2 className="section-title">Mọi thứ bạn cần <span className="gradient-text">trước khi lên đường</span></h2>
              <p className="section-desc">Những kinh nghiệm quý báu được tổng hợp từ hàng trăm du học sinh Việt Nam tại Đài Loan.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
              {experienceGuides.map((g) => (
                <Link key={g.slug} href={`/kinh-nghiem/${g.slug}`} className="experience-card">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "2.5rem" }}>{icons[g.slug] || "📋"}</div>
                    {g.badge && <span className="badge badge-blue">{g.badge}</span>}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.35 }}>{g.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{g.subtitle}</p>
                  <div style={{ color: "var(--color-primary)", fontSize: "0.85rem", fontWeight: 600 }}>Đọc thêm →</div>
                </Link>
              ))}
            </div>
            <div className="glass" style={{ marginTop: "4rem", padding: "3rem", borderRadius: "var(--radius-lg)", textAlign: "center", maxWidth: "800px", margin: "4rem auto 0" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Cần tư vấn cá nhân?</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Mỗi bạn có hoàn cảnh khác nhau. Hãy để DuHocToday tư vấn riêng cho bạn — hoàn toàn miễn phí!</p>
              <Link href="/tu-van" className="btn btn-primary">Nhận tư vấn miễn phí →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
