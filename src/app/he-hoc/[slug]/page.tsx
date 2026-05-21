import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { getStudyProgramContent, studyPrograms } from "@/lib/content";

export function generateStaticParams() {
  return studyPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getStudyProgramContent(slug);
  if (!c) return { title: "Không tìm thấy | DuHocToday" };
  return { title: `${c.title} | DuHocToday`, description: c.subtitle };
}

export default async function HeHocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getStudyProgramContent(slug);
  if (!content) notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero title={content.title} subtitle={content.subtitle} backgroundImage={content.heroImage} breadcrumbs={[{ label: "Hệ đào tạo", href: "/he-hoc" }, { label: content.title }]} badge={content.badge} />
        <section className="section">
          <div className="container" style={{ maxWidth: "900px" }}>
            {content.sections.map((s, i) => (
              <div key={i} className="content-section">
                {s.icon && <span className="content-section-icon">{s.icon}</span>}
                <h2 className="content-section-title">{s.title}</h2>
                <div className="content-section-body">{s.content}</div>
              </div>
            ))}
            {content.faqs && content.faqs.length > 0 && (
              <div style={{ marginTop: "3rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <span>❓</span><span>Câu hỏi thường gặp</span>
                </h2>
                <FAQAccordion items={content.faqs} />
              </div>
            )}
            {content.ctaText && content.ctaLink && (
              <div className="glass" style={{ marginTop: "3rem", padding: "2.5rem", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.75rem" }}>Bạn quan tâm đến {content.title}?</h3>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 1.5rem" }}>Liên hệ ngay để được tư vấn chi tiết về điều kiện, hồ sơ và quy trình đăng ký.</p>
                <Link href={content.ctaLink} className="btn btn-primary">{content.ctaText} →</Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
