"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#070B14", borderTop: "1px solid var(--color-border)", paddingTop: "4rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", paddingBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>D</div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>DuHoc<span className="gradient-text">Today</span></span>
            </div>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Kênh thông tin du học Đài Loan uy tín — hỗ trợ học bổng, hồ sơ và luyện thi TOCFL cho sinh viên Việt Nam.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[["F", "Facebook"], ["Y", "YouTube"], ["Z", "Zalo"]].map(([letter, name]) => (
                <a key={name} href="#" className="social-btn" title={name}>{letter}</a>
              ))}
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: "1.25rem" }}>Khám phá</h4>
            {[
              ["Hệ đào tạo", "/he-hoc"],
              ["Kinh nghiệm du học", "/kinh-nghiem"],
              ["Tiếng Trung", "/tieng-trung"],
              ["Blog", "/blog"],
              ["Dịch vụ & Bảng giá", "/dich-vu"],
              ["Học bổng", "/hoc-bong"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

          {/* Trường học */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: "1.25rem" }}>Trường học</h4>
            {[
              ["Miền Bắc – Đài Bắc", "/truong-hoc/mien-bac"],
              ["Miền Trung – Đài Trung", "/truong-hoc/mien-trung"],
              ["Miền Nam – Cao Hùng", "/truong-hoc/mien-nam"],
              ["Bảng xếp hạng", "/truong-hoc/xep-hang"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

          {/* Liên hệ */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: "1.25rem" }}>Liên hệ</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: "📍", text: "TP. Hồ Chí Minh & Hà Nội" },
                { icon: "📞", text: "0915 525 597 (Zalo)" },
                { icon: "✉️", text: "info@duhoctoday.vn" },
                { icon: "🕐", text: "9h – 21h, T2 – T7" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
                  <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>{text}</span>
                </div>
              ))}
            </div>
            <Link href="/tu-van" className="btn btn-primary" style={{ marginTop: "1.5rem", fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}>
              Tư vấn miễn phí →
            </Link>
          </div>
        </div>

        <div className="divider" />
        <div style={{ padding: "1.5rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ color: "var(--color-text-dim)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} DuHocToday. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[["Chính sách bảo mật", "/privacy"], ["Điều khoản sử dụng", "/terms"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ color: "var(--color-text-dim)", fontSize: "0.8rem", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
