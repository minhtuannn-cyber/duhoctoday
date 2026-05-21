import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScholarshipCard from "@/components/ScholarshipCard";
import { getMockScholarships } from "@/lib/notion";
import Link from "next/link";

const typeMap: Record<
  string,
  {
    filterType: string;
    name: string;
    emoji: string;
    desc: string;
    longDesc: string;
  }
> = {
  "chinh-phu": {
    filterType: "full",
    name: "Học bổng Chính phủ",
    emoji: "🏛️",
    desc: "Các chương trình học bổng toàn phần từ Chính phủ Đài Loan dành cho sinh viên quốc tế, bao gồm MOE Taiwan Scholarship và ICDF.",
    longDesc:
      "Học bổng Chính phủ Đài Loan (Taiwan Scholarship & ICDF) là các chương trình hỗ trợ tài chính toàn phần dành cho sinh viên quốc tế xuất sắc. Học bổng bao gồm miễn học phí, sinh hoạt phí hàng tháng (25.000 - 40.000 TWD), và nhiều quyền lợi khác.",
  },
  "tu-truong": {
    filterType: "partial",
    name: "Học bổng từ trường",
    emoji: "🎓",
    desc: "Các chương trình học bổng bán phần do các trường đại học Đài Loan tự cấp, thường miễn giảm 50-100% học phí.",
    longDesc:
      "Nhiều trường đại học tại Đài Loan cung cấp học bổng riêng cho sinh viên quốc tế, bao gồm miễn giảm học phí từ 50-100%, ký túc xá miễn phí, và trợ cấp sinh hoạt. Điều kiện thường yêu cầu GPA cao và chứng chỉ ngôn ngữ.",
  },
  hes: {
    filterType: "language",
    name: "Học bổng tiếng Hoa HES",
    emoji: "🗣️",
    desc: "Học bổng dành cho sinh viên muốn học tiếng Trung Hoa tại các trung tâm ngôn ngữ của trường đại học Đài Loan.",
    longDesc:
      "Học bổng Huayu Enrichment Scholarship (HES) do Bộ Ngoại giao Đài Loan cấp, hỗ trợ sinh viên quốc tế học tiếng Trung tại các trung tâm ngôn ngữ Hoa ngữ. Mức hỗ trợ 25.000 TWD/tháng, thời hạn 3-12 tháng.",
  },
};

export function generateStaticParams() {
  return [{ type: "chinh-phu" }, { type: "tu-truong" }, { type: "hes" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const info = typeMap[type];
  const name = info?.name || "Học bổng";
  return {
    title: `${name} Đài Loan | DuHocToday`,
    description:
      info?.desc || `Thông tin chi tiết về ${name} du học Đài Loan`,
  };
}

export default async function ScholarshipTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const info = typeMap[type];

  if (!info) {
    return (
      <>
        <Header />
        <main>
          <div
            className="container section"
            style={{
              textAlign: "center",
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <h1 style={{ marginBottom: "1rem" }}>
              Loại học bổng không tồn tại
            </h1>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "2rem",
              }}
            >
              Không tìm thấy thông tin cho loại học bổng này
            </p>
            <Link href="/hoc-bong" className="btn btn-primary">
              ← Quay lại danh sách học bổng
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const scholarships = getMockScholarships().filter(
    (sc) => sc.type === info.filterType
  );
  const otherTypes = Object.entries(typeMap).filter(([key]) => key !== type);

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={`${info.emoji} ${info.name}`}
          subtitle={info.desc}
          backgroundImage="/images/scholarship-hero.png"
          breadcrumbs={[
            { label: "Học bổng", href: "/hoc-bong" },
            { label: info.name },
          ]}
          badge={`${info.emoji} ${info.name.toUpperCase()}`}
        />

        {/* Type nav */}
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
              href="/hoc-bong"
              className="btn btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
            >
              ← Tất cả học bổng
            </Link>
            {otherTypes.map(([key, val]) => (
              <Link
                key={key}
                href={`/hoc-bong/${key}`}
                className="btn btn-outline"
                style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
              >
                {val.emoji} {val.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Description */}
        <section style={{ padding: "3rem 0 0" }}>
          <div className="container">
            <div
              className="content-section"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              <span className="content-section-icon">{info.emoji}</span>
              <h3 className="content-section-title">
                Về {info.name}
              </h3>
              <p className="content-section-body">{info.longDesc}</p>
            </div>
          </div>
        </section>

        {/* Scholarship Grid */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Danh sách học bổng</div>
              <h2 className="section-title">
                <span className="gradient-text-gold">
                  {scholarships.length} học bổng
                </span>{" "}
                {info.name.toLowerCase()}
              </h2>
              <p className="section-desc">
                Xem chi tiết từng học bổng, điều kiện và hạn nộp hồ sơ
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {scholarships.map((sc) => (
                <ScholarshipCard key={sc.id} scholarship={sc} />
              ))}
            </div>

            {scholarships.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  💰
                </div>
                <h3 style={{ marginBottom: "0.5rem" }}>
                  Chưa có học bổng nào trong danh mục này
                </h3>
                <p style={{ fontSize: "0.9rem" }}>
                  Dữ liệu đang được cập nhật. Vui lòng quay lại sau.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Tips */}
        <section style={{ padding: "0 0 4rem" }}>
          <div className="container">
            <div
              className="card"
              style={{
                padding: "2rem",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                💡 Mẹo xin {info.name.toLowerCase()} thành công
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "Chuẩn bị hồ sơ sớm ít nhất 3-6 tháng trước deadline",
                  "Viết bài luận cá nhân (SOP) rõ ràng, nổi bật động lực và mục tiêu",
                  "Chuẩn bị chứng chỉ ngôn ngữ (TOCFL/IELTS) đạt chuẩn yêu cầu",
                  "Xin thư giới thiệu từ giáo viên hoặc cấp trên có uy tín",
                  "Kiểm tra kỹ điều kiện và hạn nộp của từng chương trình",
                ].map((tip) => (
                  <li
                    key={tip}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      fontSize: "0.875rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--color-primary)",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem" }}>
                <Link
                  href="/hoc-bong/kinh-nghiem"
                  className="read-more-link"
                >
                  📝 Xem thêm kinh nghiệm xin học bổng →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "4rem 0",
            background:
              "linear-gradient(135deg, rgba(255,183,0,0.08), rgba(230,57,70,0.05))",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1rem" }}>
              Cần hỗ trợ xin{" "}
              <span className="gradient-text-gold">
                {info.name.toLowerCase()}?
              </span>
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "2rem",
                maxWidth: "500px",
                margin: "0 auto 2rem",
              }}
            >
              Đội ngũ DuHocToday sẽ hướng dẫn bạn từng bước để tăng cơ hội
              giành được học bổng
            </p>
            <Link
              href="/tu-van"
              className="btn btn-gold"
              style={{ fontSize: "1rem", padding: "0.85rem 2.5rem" }}
            >
              💰 Tư vấn học bổng miễn phí
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
