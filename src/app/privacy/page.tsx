import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | DuHocToday",
  description: "Chính sách bảo mật thông tin cá nhân của DuHocToday.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Chính sách bảo mật" breadcrumbs={[{ label: "Chính sách bảo mật" }]} compact />
        <section className="section">
          <div className="container" style={{ maxWidth: "800px" }}>
            {[
              { title: "1. Thu thập thông tin", body: "DuHocToday thu thập thông tin cá nhân khi bạn đăng ký tư vấn, bao gồm: họ tên, email, số điện thoại, và các thông tin liên quan đến nhu cầu du học. Chúng tôi chỉ thu thập thông tin cần thiết để cung cấp dịch vụ tư vấn." },
              { title: "2. Sử dụng thông tin", body: "Thông tin của bạn được sử dụng để: liên hệ tư vấn, gửi thông tin về học bổng và chương trình du học, cải thiện dịch vụ, và gửi email marketing (nếu bạn đồng ý). Chúng tôi cam kết không bán thông tin cho bên thứ ba." },
              { title: "3. Bảo mật thông tin", body: "Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân, bao gồm mã hóa dữ liệu, kiểm soát truy cập, và giám sát hệ thống." },
              { title: "4. Chia sẻ thông tin", body: "Thông tin của bạn có thể được chia sẻ với: trường đại học đối tác (khi nộp hồ sơ), cơ quan visa (khi cần thiết), và đối tác dịch vụ (dịch thuật, công chứng) — chỉ với sự đồng ý của bạn." },
              { title: "5. Quyền của bạn", body: "Bạn có quyền: truy cập, chỉnh sửa, xóa thông tin cá nhân; từ chối nhận email marketing; yêu cầu xuất dữ liệu. Liên hệ info@duhoctoday.vn để thực hiện các quyền trên." },
              { title: "6. Cookie", body: "Website sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn có thể tắt cookie trong cài đặt trình duyệt, tuy nhiên một số tính năng có thể bị ảnh hưởng." },
              { title: "7. Thay đổi chính sách", body: "DuHocToday có quyền cập nhật chính sách bảo mật. Mọi thay đổi sẽ được thông báo trên website. Bạn nên kiểm tra trang này định kỳ." },
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
