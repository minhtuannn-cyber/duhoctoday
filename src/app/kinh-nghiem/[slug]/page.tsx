import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { getExperienceContent, experienceGuides } from "@/lib/content";

export function generateStaticParams() {
  return experienceGuides.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getExperienceContent(slug);
  if (!c) return { title: "Không tìm thấy | DuHocToday" };
  return { title: `${c.title} | DuHocToday`, description: c.subtitle };
}

export default async function KinhNghiemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getExperienceContent(slug);
  if (!content) notFound();

  const hasSections = content.sections && content.sections.length > 0;
  const hasFaqs = content.faqs && content.faqs.length > 0;
  const isFaqOnly = !hasSections && hasFaqs;

  return (
    <>
      <Header />
      <main>
        <PageHero title={content.title} subtitle={content.subtitle} backgroundImage={content.heroImage} breadcrumbs={[{ label: "Kinh nghiệm", href: "/kinh-nghiem" }, { label: content.title }]} badge={content.badge} />
        <section className="section">
          <div className="container" style={{ maxWidth: "900px" }}>
            {hasSections && content.sections.map((s, i) => (
              <div key={i} className="content-section">
                {s.icon && <span className="content-section-icon">{s.icon}</span>}
                <h2 className="content-section-title">{s.title}</h2>
                <div className="content-section-body">{s.content}</div>
              </div>
            ))}
            {hasFaqs && (
              <div style={{ marginTop: hasSections ? "3rem" : "0" }}>
                {isFaqOnly ? (
                  <>
                    <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                      <span className="section-label">Hỏi &amp; Đáp</span>
                      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Tổng hợp <span className="gradient-text">câu hỏi thường gặp</span></h2>
                      <p style={{ color: "var(--color-text-muted)", maxWidth: "550px", margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.7 }}>Click vào từng câu hỏi để xem câu trả lời chi tiết.</p>
                    </div>
                    <FAQAccordion items={content.faqs!} />
                  </>
                ) : (
                  <>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                      <span>❓</span><span>Câu hỏi thường gặp</span>
                    </h2>
                    <FAQAccordion items={content.faqs!} />
                  </>
                )}
              </div>
            )}
            <div className="glass" style={{ marginTop: "3rem", padding: "2.5rem", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.75rem" }}>Cần hỗ trợ thêm?</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 1.5rem" }}>Đội ngũ DuHocToday luôn sẵn sàng giải đáp mọi thắc mắc của bạn.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/tu-van" className="btn btn-primary">Đăng ký tư vấn →</Link>
                <Link href="/kinh-nghiem" className="btn btn-outline">← Xem thêm kinh nghiệm</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
