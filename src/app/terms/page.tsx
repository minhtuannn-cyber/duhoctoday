import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | DuHocToday",
  description: "Điều khoản sử dụng dịch vụ của DuHocToday.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Điều khoản sử dụng" breadcrumbs={[{ label: "Điều khoản sử dụng" }]} compact />
        <section className="section">
          <div className="container" style={{ maxWidth: "800px" }}>
            {[
              { title: "1. Giới thiệu", body: "Chào mừng bạn đến với DuHocToday. Bằng việc sử dụng website và dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản dưới đây. Vui lòng đọc kỹ trước khi sử dụng." },
              { title: "2. Dịch vụ", body: "DuHocToday cung cấp dịch vụ tư vấn du học Đài Loan, bao gồm: tư vấn chọn trường và hệ đào tạo, hỗ trợ chuẩn bị hồ sơ, dịch thuật và công chứng, xin visa, và hỗ trợ sau nhập học. Chúng tôi nỗ lực cung cấp thông tin chính xác nhưng không đảm bảo kết quả xét tuyển." },
              { title: "3. Trách nhiệm người dùng", body: "Bạn cam kết: cung cấp thông tin chính xác và đầy đủ, không sử dụng dịch vụ cho mục đích bất hợp pháp, bảo mật thông tin tài khoản, và tôn trọng quyền sở hữu trí tuệ." },
              { title: "4. Thanh toán & Hoàn tiền", body: "Phí dịch vụ được thỏa thuận trước khi bắt đầu. Thanh toán theo từng giai đoạn. Hoàn tiền được xem xét theo từng trường hợp cụ thể, tối đa 70% trong 7 ngày đầu nếu chưa bắt đầu xử lý hồ sơ." },
              { title: "5. Giới hạn trách nhiệm", body: "DuHocToday không chịu trách nhiệm cho: quyết định xét tuyển của trường đại học, quyết định cấp visa của cơ quan lãnh sự, thay đổi chính sách tuyển sinh, và các yếu tố bất khả kháng." },
              { title: "6. Quyền sở hữu trí tuệ", body: "Toàn bộ nội dung trên website (bài viết, hình ảnh, thiết kế) thuộc quyền sở hữu của DuHocToday. Bạn không được sao chép, phân phối hoặc sử dụng cho mục đích thương mại mà không có sự cho phép." },
              { title: "7. Liên hệ", body: "Nếu có thắc mắc về điều khoản sử dụng, vui lòng liên hệ: Email: info@duhoctoday.vn | Hotline: 0924 893 388 | Zalo: 0924 893 388" },
            ].map(({ title, body }) => (
              <div key={title} className="content-section">
                <h2 className="content-section-title">{title}</h2>
                <div className="content-section-body">{body}</div>
              </div>
            ))}
            <p style={{ color: "var(--color-text-dim)", fontSize: "0.85rem", marginTop: "2rem", textAlign: "center" }}>Cập nhật lần cuối: Tháng 5, 2025</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
