import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { getMockSchools } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Xếp hạng trường đại học Đài Loan",
  description: "Bảng xếp hạng trường đại học Đài Loan theo ranking, học phí và học bổng — giúp bạn chọn trường phù hợp.",
};

export default async function XepHangPage() {
  const schools = getMockSchools().sort((a, b) => a.ranking - b.ranking);

  return (
    <>
      <Header />
      <main>
        <PageHero title="Xếp hạng trường đại học" subtitle="Bảng xếp hạng chi tiết các trường đại học hàng đầu tại Đài Loan." backgroundImage="/images/university-campus.png" breadcrumbs={[{ label: "Trường học", href: "/truong-hoc" }, { label: "Xếp hạng" }]} badge="📊 Ranking" compact />
        <section className="section">
          <div className="container">
            <div style={{ overflowX: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Hạng</th>
                    <th>Tên trường</th>
                    <th>Loại</th>
                    <th>Thành phố</th>
                    <th>Khu vực</th>
                    <th>Học phí/năm</th>
                    <th>Học bổng</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div style={{ width: 32, height: 32, borderRadius: "8px", background: s.ranking <= 3 ? "var(--gradient-primary)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: s.ranking <= 3 ? "#fff" : "var(--color-text-muted)" }}>
                          {s.ranking}
                        </div>
                      </td>
                      <td style={{ fontWeight: 700 }}>{s.name}</td>
                      <td><span className={`badge ${s.type === "public" ? "badge-blue" : "badge-green"}`}>{s.type === "public" ? "Công lập" : "Tư thục"}</span></td>
                      <td style={{ color: "var(--color-text-muted)" }}>{s.city}</td>
                      <td style={{ color: "var(--color-text-muted)" }}>{s.region}</td>
                      <td><span style={{ color: "var(--color-gold)", fontWeight: 600 }}>${s.tuitionMin.toLocaleString()} – ${s.tuitionMax.toLocaleString()}</span></td>
                      <td>{s.scholarships ? <span className="badge badge-green">Có</span> : <span style={{ color: "var(--color-text-dim)" }}>—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/truong-hoc" className="btn btn-outline">← Quay lại danh sách trường</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
