"use client";
import { useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export default function TuVanPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: "", level: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", phone: "", program: "", level: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <>
      <Header />
      <main>
        <PageHero title="Đăng ký tư vấn du học" subtitle="Đội ngũ chuyên gia DuHocToday sẽ tư vấn miễn phí và đồng hành cùng bạn từ A đến Z." backgroundImage="/images/consultation-hero.png" breadcrumbs={[{ label: "Tư vấn" }]} badge="🎓 Miễn phí" />
        <section className="section">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>
              {/* Form */}
              <div className="card" style={{ padding: "2.5rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Thông tin đăng ký</h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>Vui lòng điền đầy đủ thông tin để chúng tôi tư vấn chính xác nhất.</p>
                
                {status === "success" && <div className="alert alert-success">🎉 Đăng ký thành công! Chúng tôi sẽ liên hệ bạn trong vòng 24 giờ.</div>}
                {status === "error" && <div className="alert alert-error">❌ Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp.</div>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Họ và tên <span className="required">*</span></label>
                    <input type="text" className="input" placeholder="Nguyễn Văn A" value={form.name} onChange={update("name")} required />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">Email <span className="required">*</span></label>
                      <input type="email" className="input" placeholder="email@example.com" value={form.email} onChange={update("email")} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Số điện thoại <span className="required">*</span></label>
                      <input type="tel" className="input" placeholder="0912 345 678" value={form.phone} onChange={update("phone")} required />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">Hệ học quan tâm</label>
                      <select className="input" value={form.program} onChange={update("program")}>
                        <option value="">Chọn hệ học</option>
                        <option value="ngon-ngu">Hệ ngôn ngữ</option>
                        <option value="tu-tuc">Hệ tự túc (Chính quy)</option>
                        <option value="du-bi">Hệ dự bị 1+4</option>
                        <option value="vhvl">Hệ vừa học vừa làm</option>
                        <option value="hoa-kieu">Hệ Hoa Kiều</option>
                        <option value="chua-biet">Chưa biết</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Trình độ hiện tại</label>
                      <select className="input" value={form.level} onChange={update("level")}>
                        <option value="">Chọn trình độ</option>
                        <option value="thpt">Đang học THPT</option>
                        <option value="tn-thpt">Tốt nghiệp THPT</option>
                        <option value="dh">Đang học ĐH</option>
                        <option value="tn-dh">Tốt nghiệp ĐH</option>
                        <option value="khac">Khác</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tin nhắn</label>
                    <textarea className="input" placeholder="Bạn muốn hỏi gì thêm?" value={form.message} onChange={update("message")} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "1rem" }} disabled={status === "loading"}>
                    {status === "loading" ? "Đang gửi..." : "🎓 Gửi đăng ký tư vấn"}
                  </button>
                </form>
              </div>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="card" style={{ padding: "2rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>📞 Liên hệ trực tiếp</h3>
                  {[
                    { icon: "📞", label: "Hotline (Zalo)", value: "0924 893 388" },
                    { icon: "✉️", label: "Email", value: "info@duhoctoday.vn" },
                    { icon: "📍", label: "Văn phòng", value: "TP.HCM & Hà Nội" },
                    { icon: "🕐", label: "Làm việc", value: "9h – 21h, T2 – T7" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-dim)", marginBottom: "0.15rem" }}>{label}</div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ padding: "2rem", background: "linear-gradient(135deg, rgba(230,57,70,0.1), rgba(255,183,0,0.05))" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>💡 Tại sao chọn DuHocToday?</h3>
                  <ul style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                    {["10+ năm kinh nghiệm", "Tỷ lệ đậu visa 95%+", "500+ sinh viên thành công", "Tư vấn miễn phí 100%", "Hỗ trợ 24/7"].map((t) => (
                      <li key={t} style={{ display: "flex", gap: "0.5rem" }}>
                        <span style={{ color: "var(--color-primary)" }}>✓</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
