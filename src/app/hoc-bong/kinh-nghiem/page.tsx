import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kinh nghiệm xin học bổng Đài Loan | DuHocToday",
  description:
    "Tổng hợp kinh nghiệm xin học bổng du học Đài Loan thành công — từ cách viết hồ sơ nổi bật đến những sai lầm cần tránh. Hướng dẫn chi tiết từ DuHocToday.",
};

const sopTips = [
  {
    title: "Mở đầu ấn tượng",
    desc: "Bắt đầu bằng một câu chuyện cá nhân hoặc trải nghiệm thực tế liên quan đến ngành học. Tránh những câu mở đầu chung chung như 'Tôi muốn du học vì...'",
  },
  {
    title: "Thể hiện mục tiêu rõ ràng",
    desc: "Nêu rõ bạn muốn học gì, tại sao chọn Đài Loan, và bạn sẽ đóng góp gì cho cộng đồng sau khi hoàn thành chương trình học.",
  },
  {
    title: "Kết nối kinh nghiệm với tương lai",
    desc: "Liên hệ các hoạt động ngoại khóa, công việc, hoặc dự án đã tham gia với kế hoạch học tập và nghề nghiệp trong tương lai.",
  },
  {
    title: "Giữ cấu trúc mạch lạc",
    desc: "Chia bài luận thành 3-4 phần rõ ràng: giới thiệu, lý do chọn ngành/trường, kế hoạch tương lai, và kết luận. Mỗi đoạn 4-6 câu.",
  },
];

const evaluatorChecklist = [
  { icon: "📊", title: "Thành tích học tập", desc: "GPA, bảng điểm, giải thưởng học thuật" },
  { icon: "🌍", title: "Hoạt động ngoại khóa", desc: "Tình nguyện, câu lạc bộ, dự án cộng đồng" },
  { icon: "📝", title: "Bài luận cá nhân (SOP)", desc: "Động lực, mục tiêu, kế hoạch cụ thể" },
  { icon: "💼", title: "Kinh nghiệm làm việc", desc: "Thực tập, part-time, dự án chuyên môn" },
  { icon: "🗣️", title: "Năng lực ngôn ngữ", desc: "TOCFL, IELTS, TOEFL hoặc chứng chỉ tương đương" },
  { icon: "📨", title: "Thư giới thiệu", desc: "Từ giáo viên, cấp trên hoặc người có uy tín" },
];

const commonMistakes = [
  {
    mistake: "Nộp hồ sơ sát deadline",
    solution: "Bắt đầu chuẩn bị ít nhất 3-6 tháng trước hạn nộp. Đặt lịch nhắc nhở từng bước.",
  },
  {
    mistake: "Viết SOP quá chung chung",
    solution: "Cá nhân hóa bài luận cho từng chương trình học bổng. Nêu cụ thể tên trường, ngành học.",
  },
  {
    mistake: "Không kiểm tra kỹ yêu cầu",
    solution: "Đọc kỹ tất cả điều kiện, giấy tờ cần thiết. Lập checklist và đánh dấu từng mục.",
  },
  {
    mistake: "Thiếu chứng chỉ ngôn ngữ",
    solution: "Đăng ký thi TOCFL/IELTS sớm. Một số chứng chỉ cần 2-3 tháng để có kết quả.",
  },
  {
    mistake: "Bỏ qua phần Research Plan",
    solution: "Nếu apply bậc Thạc sĩ/Tiến sĩ, chuẩn bị kế hoạch nghiên cứu chi tiết và liên hệ giáo sư trước.",
  },
];

const timeline = [
  { month: "Tháng 1-2", task: "Tìm hiểu các chương trình học bổng, lọc trường phù hợp", icon: "🔍" },
  { month: "Tháng 3-4", task: "Chuẩn bị bảng điểm, bằng cấp, chứng chỉ ngôn ngữ", icon: "📄" },
  { month: "Tháng 5-6", task: "Viết SOP, xin thư giới thiệu, hoàn thiện hồ sơ", icon: "✍️" },
  { month: "Tháng 7-8", task: "Nộp hồ sơ online, gửi bản cứng (nếu cần)", icon: "📮" },
  { month: "Tháng 9-10", task: "Chờ kết quả, phỏng vấn (nếu có), xin visa", icon: "⏳" },
  { month: "Tháng 11-12", task: "Nhận kết quả, chuẩn bị hành lý, bay sang Đài Loan", icon: "✈️" },
];

export default function KinhNghiemHocBongPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Kinh nghiệm xin học bổng Đài Loan"
          subtitle="Hướng dẫn chi tiết từ A-Z để viết hồ sơ xin học bổng thành công — bao gồm cách viết SOP, tiêu chí đánh giá, và những sai lầm phổ biến cần tránh."
          backgroundImage="/images/scholarship-hero.png"
          breadcrumbs={[
            { label: "Học bổng", href: "/hoc-bong" },
            { label: "Kinh nghiệm" },
          ]}
          badge="📝 KINH NGHIỆM"
        />

        {/* Intro */}
        <section className="section">
          <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="section-header">
              <div className="section-label">Bắt đầu từ đâu?</div>
              <h2 className="section-title">
                Lộ trình xin học bổng{" "}
                <span className="gradient-text-gold">thành công</span>
              </h2>
              <p className="section-desc">
                Theo dõi timeline chuẩn bị hồ sơ theo từng tháng để không bỏ lỡ
                bất kỳ bước nào
              </p>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative", padding: "0 0 0 2rem" }}>
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  background:
                    "linear-gradient(to bottom, var(--color-primary), var(--color-gold))",
                }}
              />
              {timeline.map((item, i) => (
                <div
                  key={item.month}
                  style={{
                    position: "relative",
                    paddingBottom: i === timeline.length - 1 ? 0 : "2rem",
                    paddingLeft: "2rem",
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-0.45rem",
                      top: "0.35rem",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "var(--color-bg)",
                      border: "2px solid var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="content-section" style={{ marginBottom: 0 }}>
                    <span
                      className="badge badge-primary"
                      style={{ marginBottom: "0.75rem" }}
                    >
                      {item.month}
                    </span>
                    <p
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOP Writing Tips */}
        <section
          className="section"
          style={{
            background:
              "linear-gradient(180deg, rgba(230,57,70,0.05), transparent)",
          }}
        >
          <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="section-header">
              <div className="section-label">Viết SOP</div>
              <h2 className="section-title">
                Cách viết bài luận cá nhân{" "}
                <span className="gradient-text">nổi bật</span>
              </h2>
              <p className="section-desc">
                Statement of Purpose (SOP) là phần quan trọng nhất trong hồ sơ
                xin học bổng. Hãy làm nổi bật câu chuyện của bạn.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {sopTips.map((tip, i) => (
                <div key={tip.title} className="content-section">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "var(--gradient-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <h3 className="content-section-title" style={{ marginBottom: 0 }}>
                      {tip.title}
                    </h3>
                  </div>
                  <p className="content-section-body">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What evaluators look for */}
        <section className="section">
          <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="section-header">
              <div className="section-label">Tiêu chí đánh giá</div>
              <h2 className="section-title">
                Hội đồng xét duyệt{" "}
                <span className="gradient-text-gold">đánh giá gì?</span>
              </h2>
              <p className="section-desc">
                Hiểu rõ tiêu chí để tập trung chuẩn bị đúng trọng tâm
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1rem",
              }}
            >
              {evaluatorChecklist.map((item) => (
                <div
                  key={item.title}
                  className="card"
                  style={{
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                    {item.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section
          className="section"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,183,0,0.05), transparent)",
          }}
        >
          <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="section-header">
              <div className="section-label">Lưu ý quan trọng</div>
              <h2 className="section-title">
                Những sai lầm{" "}
                <span className="gradient-text">cần tránh</span>
              </h2>
              <p className="section-desc">
                Đừng để những lỗi nhỏ làm mất cơ hội lớn
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {commonMistakes.map((item, i) => (
                <div key={i} className="content-section">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.5rem",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span style={{ color: "var(--color-primary)", fontSize: "1rem" }}>
                          ✕
                        </span>
                        <h4
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "var(--color-primary-light)",
                          }}
                        >
                          Sai lầm
                        </h4>
                      </div>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--color-text-muted)",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.mistake}
                      </p>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span style={{ color: "#4ADE80", fontSize: "1rem" }}>
                          ✓
                        </span>
                        <h4
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "#4ADE80",
                          }}
                        >
                          Cách khắc phục
                        </h4>
                      </div>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--color-text-muted)",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bonus Tips Alert */}
        <section style={{ padding: "0 0 4rem" }}>
          <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="alert alert-success">
              🌟 <strong>Mẹo vàng:</strong> Hãy liên hệ trực tiếp với giáo sư
              hoặc bộ phận tuyển sinh của trường trước khi nộp hồ sơ. Điều này
              thể hiện sự chủ động và giúp bạn hiểu rõ hơn về chương trình học.
              Nhiều giáo sư sẵn sàng hỗ trợ nếu bạn thể hiện sự nghiêm túc.
            </div>

            <div className="alert alert-info">
              📌 <strong>Tài liệu tham khảo:</strong> DuHocToday cung cấp mẫu
              SOP, Research Plan và bộ câu hỏi phỏng vấn thường gặp. Liên hệ
              tư vấn để nhận tài liệu miễn phí.
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "4rem 0",
            background:
              "linear-gradient(135deg, rgba(255,183,0,0.1), rgba(230,57,70,0.06))",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1rem" }}>
              Sẵn sàng nộp hồ sơ{" "}
              <span className="gradient-text-gold">xin học bổng?</span>
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "2rem",
                maxWidth: "550px",
                margin: "0 auto 2rem",
                lineHeight: 1.7,
              }}
            >
              Đội ngũ tư vấn của DuHocToday sẽ review hồ sơ, chỉnh sửa SOP và
              hướng dẫn bạn từng bước để tăng cơ hội giành học bổng
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/tu-van"
                className="btn btn-gold"
                style={{ fontSize: "1rem", padding: "0.85rem 2.5rem" }}
              >
                💰 Tư vấn học bổng miễn phí
              </Link>
              <Link
                href="/hoc-bong"
                className="btn btn-outline"
                style={{ fontSize: "1rem", padding: "0.85rem 2.5rem" }}
              >
                ← Xem tất cả học bổng
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
