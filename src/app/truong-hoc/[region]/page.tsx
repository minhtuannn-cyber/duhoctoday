import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SchoolCard from "@/components/SchoolCard";
import { getMockSchools } from "@/lib/notion";
import Link from "next/link";

const regionMap: Record<string, { name: string; emoji: string; desc: string }> = {
  "mien-bac": {
    name: "Miền Bắc",
    emoji: "🏔️",
    desc: "Khám phá các trường đại học hàng đầu tại khu vực phía Bắc Đài Loan — Đài Bắc, Tân Bắc, Tân Trúc, Đào Viên và các thành phố lân cận.",
  },
  "mien-trung": {
    name: "Miền Trung",
    emoji: "🌾",
    desc: "Tìm hiểu các trường đại học tại miền Trung Đài Loan — Đài Trung, Chương Hóa, Nam Đầu với chi phí sinh hoạt hợp lý.",
  },
  "mien-nam": {
    name: "Miền Nam",
    emoji: "🌊",
    desc: "Các trường đại học tại miền Nam Đài Loan — Cao Hùng, Đài Nam, Bình Đông với khí hậu ấm áp và nhiều cơ hội thực tập.",
  },
};

export function generateStaticParams() {
  return [
    { region: "mien-bac" },
    { region: "mien-trung" },
    { region: "mien-nam" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const info = regionMap[region];
  const name = info?.name || "Khu vực";
  return {
    title: `Trường đại học ${name} Đài Loan | DuHocToday`,
    description: info?.desc || `Danh sách trường đại học tại ${name} Đài Loan`,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  const info = regionMap[region];

  if (!info) {
    return (
      <>
        <Header />
        <main>
          <div
            className="container section"
            style={{ textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <h1 style={{ marginBottom: "1rem" }}>Khu vực không tồn tại</h1>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
              Không tìm thấy thông tin cho khu vực này
            </p>
            <Link href="/truong-hoc" className="btn btn-primary">
              ← Quay lại danh sách trường
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const schools = getMockSchools(info.name);
  const otherRegions = Object.entries(regionMap).filter(([key]) => key !== region);

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={`${info.emoji} Trường đại học ${info.name}`}
          subtitle={info.desc}
          backgroundImage="/images/university-campus.png"
          breadcrumbs={[
            { label: "Trường học", href: "/truong-hoc" },
            { label: info.name },
          ]}
          badge={`${info.emoji} ${info.name.toUpperCase()}`}
        />

        {/* Region Nav */}
        <section
          style={{
            borderBottom: "1px solid var(--color-border)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              gap: "0.5rem",
              padding: "1rem 1.5rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/truong-hoc"
              className="btn btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
            >
              ← Tất cả trường
            </Link>
            {otherRegions.map(([key, val]) => (
              <Link
                key={key}
                href={`/truong-hoc/${key}`}
                className="btn btn-outline"
                style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
              >
                {val.emoji} {val.name}
              </Link>
            ))}
          </div>
        </section>

        {/* School Grid */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Danh sách trường</div>
              <h2 className="section-title">
                <span className="gradient-text">{schools.length} trường</span>{" "}
                tại {info.name}
              </h2>
              <p className="section-desc">
                Chọn trường phù hợp với ngành học và ngân sách của bạn
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>

            {schools.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏫</div>
                <h3 style={{ marginBottom: "0.5rem" }}>
                  Chưa có trường nào trong khu vực này
                </h3>
                <p style={{ fontSize: "0.9rem" }}>
                  Dữ liệu đang được cập nhật. Vui lòng quay lại sau.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "4rem 0",
            background:
              "linear-gradient(135deg, rgba(230,57,70,0.08), rgba(255,183,0,0.05))",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1rem" }}>
              Bạn muốn học tại{" "}
              <span className="gradient-text-gold">{info.name}?</span>
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "2rem",
                maxWidth: "500px",
                margin: "0 auto 2rem",
              }}
            >
              Liên hệ ngay để được tư vấn miễn phí về ngành học, học phí và quy
              trình nộp hồ sơ
            </p>
            <Link
              href="/tu-van"
              className="btn btn-primary"
              style={{ fontSize: "1rem", padding: "0.85rem 2.5rem" }}
            >
              🎓 Tư vấn miễn phí
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
