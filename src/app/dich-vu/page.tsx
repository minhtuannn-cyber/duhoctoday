import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dịch vụ & Bảng giá | DuHocToday",
  description:
    "Các gói dịch vụ hỗ trợ du học Đài Loan chuyên nghiệp từ DuHocToday. Hồ sơ ngôn ngữ, tự túc, VHVL, học bổng, visa và combo toàn diện.",
};

const services = [
  {
    id: "ngon-ngu",
    name: "Hồ sơ hệ Ngôn ngữ",
    price: "3.000.000",
    description: "Dành cho bạn muốn sang Đài Loan học tiếng Trung tại các trung tâm ngôn ngữ.",
    features: [
      "Tư vấn chọn trường phù hợp",
      "Chuẩn bị hồ sơ đầy đủ",
      "Dịch thuật tài liệu",
      "Nộp hồ sơ trực tuyến",
    ],
    highlighted: false,
    badge: null,
    icon: "📚",
  },
  {
    id: "tu-tuc",
    name: "Hồ sơ hệ Tự túc",
    price: "5.000.000",
    description: "Dành cho bạn muốn học chính quy Cử nhân / Thạc sĩ / Tiến sĩ tại Đài Loan.",
    features: [
      "Tư vấn chọn trường + ngành học",
      "Chuẩn bị hồ sơ toàn bộ",
      "Viết Study Plan chuyên nghiệp",
      "Soạn thư giới thiệu",
      "Nộp hồ sơ & theo dõi kết quả",
    ],
    highlighted: false,
    badge: null,
    icon: "🎓",
  },
  {
    id: "vhvl",
    name: "Hồ sơ hệ VHVL",
    price: "4.000.000",
    description: "Chương trình Vừa học Vừa làm – kết hợp học tập và thực tập tại doanh nghiệp.",
    features: [
      "Tìm doanh nghiệp tiếp nhận",
      "Chuẩn bị hồ sơ đầy đủ",
      "Hỗ trợ phỏng vấn online",
    ],
    highlighted: false,
    badge: null,
    icon: "💼",
  },
  {
    id: "hoc-bong",
    name: "Hồ sơ học bổng",
    price: "6.000.000",
    description: "Gói Premium hỗ trợ toàn diện cho các chương trình học bổng Đài Loan.",
    features: [
      "Tất cả dịch vụ hồ sơ Tự túc",
      "Review & chỉnh sửa Essay",
      "Luyện phỏng vấn 1-1",
      "Tư vấn chiến lược học bổng",
      "Hỗ trợ đến khi có kết quả",
    ],
    highlighted: false,
    badge: "Premium",
    icon: "🏆",
  },
  {
    id: "visa",
    name: "Visa + Chứng thực",
    price: "2.000.000",
    description: "Dịch vụ hợp pháp hóa lãnh sự và xin visa du học Đài Loan.",
    features: [
      "Hợp pháp hóa lãnh sự hồ sơ",
      "Chuẩn bị hồ sơ xin Visa",
      "Hướng dẫn phỏng vấn Visa",
      "Theo dõi tiến trình",
    ],
    highlighted: false,
    badge: null,
    icon: "✈️",
  },
  {
    id: "combo",
    name: "Combo toàn diện",
    price: "8.000.000",
    description: "Gói dịch vụ trọn gói từ A-Z – từ hồ sơ đến visa, bay sang Đài Loan.",
    features: [
      "Tư vấn chọn trường + ngành",
      "Chuẩn bị hồ sơ toàn bộ",
      "Dịch thuật & chứng thực",
      "Study Plan + Thư giới thiệu",
      "Hợp pháp hóa lãnh sự",
      "Xin Visa du học",
      "Hỗ trợ đặt vé & ký túc xá",
      "Đón sân bay tại Đài Loan",
    ],
    highlighted: true,
    badge: "Phổ biến nhất",
    icon: "🚀",
  },
];

export default function DichVuPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Dịch vụ & Bảng giá"
          subtitle="Các gói dịch vụ du học Đài Loan chuyên nghiệp, minh bạch và tận tâm"
          backgroundImage="/images/hero-banner.png"
          breadcrumbs={[
            { label: "Dịch vụ" },
          ]}
        />

        {/* Services Grid */}
        <section className="section">
          <div className="container">
            <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="section-label">Bảng giá dịch vụ</span>
              <h2 className="section-title">
                Chọn gói dịch vụ <span className="gradient-text">phù hợp với bạn</span>
              </h2>
              <p className="section-desc">
                Mọi gói dịch vụ đều bao gồm tư vấn miễn phí ban đầu và hỗ trợ sau khi đậu visa
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "2rem",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="card"
                  style={{
                    padding: "2rem",
                    position: "relative",
                    border: service.highlighted
                      ? "2px solid var(--color-gold)"
                      : "1px solid var(--color-border)",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    ...(service.highlighted
                      ? {
                          boxShadow: "0 0 30px rgba(255, 183, 0, 0.15)",
                          transform: "scale(1.02)",
                        }
                      : {}),
                  }}
                >
                  {service.badge && (
                    <span
                      className={
                        service.highlighted ? "badge badge-gold" : "badge badge-primary"
                      }
                      style={{
                        position: "absolute",
                        top: "-0.75rem",
                        right: "1.5rem",
                        fontSize: "0.8rem",
                        padding: "0.35rem 1rem",
                      }}
                    >
                      {service.badge}
                    </span>
                  )}

                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                    {service.icon}
                  </div>

                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {service.name}
                  </h3>

                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {service.description}
                  </p>

                  <div
                    style={{
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      className={service.highlighted ? "gradient-text-gold" : "gradient-text"}
                      style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                      }}
                    >
                      {service.price}
                    </span>
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                        marginLeft: "0.25rem",
                      }}
                    >
                      VNĐ
                    </span>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 2rem 0",
                      flex: 1,
                    }}
                  >
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          marginBottom: "0.75rem",
                          color: "var(--color-text-muted)",
                          fontSize: "0.9rem",
                          lineHeight: 1.5,
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={
                            service.highlighted
                              ? "var(--color-gold)"
                              : "var(--color-primary)"
                          }
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/tu-van"
                    className={
                      service.highlighted ? "btn btn-primary" : "btn btn-outline"
                    }
                    style={{
                      textAlign: "center",
                      width: "100%",
                      padding: "0.85rem 1.5rem",
                    }}
                  >
                    {service.highlighted ? "Đăng ký ngay" : "Tư vấn miễn phí"}
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA section */}
            <div
              className="glass"
              style={{
                marginTop: "4rem",
                padding: "3rem",
                borderRadius: "1rem",
                textAlign: "center",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "1rem",
                }}
              >
                Chưa biết chọn gói nào?
              </h3>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.7,
                }}
              >
                Hãy để đội ngũ tư vấn của DuHocToday hỗ trợ bạn chọn gói dịch vụ phù hợp nhất.
                Tư vấn ban đầu hoàn toàn miễn phí!
              </p>
              <Link href="/tu-van" className="btn btn-primary">
                Nhận tư vấn miễn phí
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
