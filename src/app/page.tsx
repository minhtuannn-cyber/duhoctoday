import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQAccordion from "@/components/FAQAccordion";
import { getMockPosts, getMockSchools, getMockScholarships } from "@/lib/notion";

export default async function HomePage() {
  const posts = getMockPosts();
  const featured = posts.filter((p) => p.featured).slice(0, 3);
  const latest = posts.slice(0, 6);
  const schools = getMockSchools().slice(0, 6);
  const scholarships = getMockScholarships();

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image src="/images/hero-banner.png" alt="Đài Loan" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(11,15,26,0.92) 50%, rgba(11,15,26,0.5))" }} />
          </div>
          <div className="container" style={{ position: "relative", zIndex: 1, padding: "6rem 1.5rem" }}>
            <div style={{ maxWidth: "620px" }}>
              <div className="badge badge-primary" style={{ marginBottom: "1.5rem" }}>🇹🇼 Kênh du học Đài Loan #1 Việt Nam</div>
              <h1 style={{ marginBottom: "1.5rem", fontWeight: 900, lineHeight: 1.15 }}>
                Hành trình <span className="gradient-text">Du Học Đài Loan</span> bắt đầu từ đây
              </h1>
              <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", marginBottom: "2.5rem", lineHeight: 1.8 }}>
                Thông tin học bổng, trường học, hệ đào tạo và kinh nghiệm sống thực tế — tất cả tại{" "}
                <strong style={{ color: "var(--color-text)" }}>DuHocToday</strong>.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/tu-van" className="btn btn-primary">🎓 Tư vấn miễn phí</Link>
                <Link href="/hoc-bong" className="btn btn-outline">Xem học bổng →</Link>
              </div>
              <div style={{ display: "flex", gap: "2.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
                {[["500+", "Sinh viên thành công"], ["50+", "Trường đối tác"], ["95%", "Tỷ lệ đậu visa"], ["10+", "Năm kinh nghiệm"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--color-primary)" }}>{num}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES BAR ───────────────────────────────────────── */}
        <section style={{ background: "var(--color-bg-card)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "flex", overflowX: "auto", padding: "0 1.5rem" }}>
            {[
              { icon: "🏫", label: "Trường học", href: "/truong-hoc" },
              { icon: "🎓", label: "Học bổng", href: "/hoc-bong" },
              { icon: "📋", label: "Hồ sơ", href: "/kinh-nghiem/ho-so" },
              { icon: "🗣️", label: "TOCFL", href: "/tieng-trung/tocfl" },
              { icon: "🏠", label: "Ký túc xá", href: "/dich-vu/ky-tuc-xa" },
              { icon: "💼", label: "Vừa học vừa làm", href: "/he-hoc/vhvl" },
              { icon: "🌏", label: "Kinh nghiệm", href: "/kinh-nghiem" },
              { icon: "📞", label: "Tư vấn", href: "/tu-van" },
            ].map(({ icon, label, href }) => (
              <Link key={href} href={href} className="cat-link">
                <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── FEATURED POSTS ───────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Bài viết nổi bật</div>
              <h2 className="section-title">Thông tin <span className="gradient-text">mới nhất</span></h2>
              <p className="section-desc">Cập nhật thông tin tuyển sinh, học bổng và kinh nghiệm du học Đài Loan.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {featured.map((post) => (
                <article key={post.id} className="card">
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <Image src={post.coverImage || "/images/hero-banner.png"} alt={post.title} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,15,26,0.8), transparent)" }} />
                    <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                      <span className="badge badge-primary">{post.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ marginBottom: "0.75rem", fontSize: "1.05rem", lineHeight: 1.4 }}>
                      <Link href={`/bai-viet/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{post.title}</Link>
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: 1.6 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>⏱ {post.readTime}</span>
                      <Link href={`/bai-viet/${post.slug}`} className="read-more-link">Đọc thêm →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── STUDY PROGRAMS ───────────────────────────────────────── */}
        <section className="section" style={{ background: "var(--color-bg-card)" }}>
          <div className="container">
            <div className="section-header">
              <div className="section-label">Hệ đào tạo</div>
              <h2 className="section-title">Chọn hệ học <span className="gradient-text">phù hợp</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {[
                { icon: "🎓", title: "Hệ Tự túc (Chính quy)", desc: "Học cùng sinh viên Đài Loan, cơ hội nhận học bổng từ trường.", badge: "Phổ biến", href: "/he-hoc/tu-tuc" },
                { icon: "⚙️", title: "Hệ Vừa học vừa làm", desc: "Học lý thuyết + thực tập tại doanh nghiệp, thu nhập ổn định.", badge: "Hot 🔥", href: "/he-hoc/vhvl" },
                { icon: "📚", title: "Hệ Dự bị 1+4", desc: "1 năm học tiếng Trung + 4 năm đại học, không cần chứng chỉ ngoại ngữ.", badge: "Dễ nhập học", href: "/he-hoc/du-bi" },
                { icon: "🗣️", title: "Hệ Ngôn ngữ", desc: "Học tiếng Trung tại trung tâm ngôn ngữ trường đại học.", badge: "Linh hoạt", href: "/he-hoc/ngon-ngu" },
                { icon: "🌏", title: "Hệ Hoa Kiều", desc: "Chương trình đặc biệt cho người gốc Hoa với nhiều ưu đãi.", badge: "Ưu đãi cao", href: "/he-hoc/hoa-kieu" },
                { icon: "💡", title: "Hệ INTENSE & Exchange", desc: "Cơ hội học tập và làm việc tại doanh nghiệp công nghệ cao.", badge: "Mới", href: "/he-hoc/intense" },
              ].map(({ icon, title, desc, badge, href }) => (
                <Link key={href} href={href} className="program-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2rem" }}>{icon}</span>
                    <span className="badge badge-primary" style={{ fontSize: "0.7rem" }}>{badge}</span>
                  </div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{title}</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>{desc}</p>
                  <div style={{ marginTop: "1rem", color: "var(--color-primary)", fontSize: "0.85rem", fontWeight: 600 }}>Xem chi tiết →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCHOLARSHIPS ─────────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Học bổng</div>
              <h2 className="section-title">Học bổng <span className="gradient-text-gold">hấp dẫn</span> đang mở</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {scholarships.map((sc) => (
                <div key={sc.id} className="card" style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span className={`badge ${sc.type === "full" ? "badge-gold" : sc.type === "partial" ? "badge-blue" : "badge-green"}`}>
                      {sc.type === "full" ? "Toàn phần" : sc.type === "partial" ? "Bán phần" : "Ngôn ngữ"}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>HH: {sc.deadline}</span>
                  </div>
                  <h3 style={{ fontSize: "0.95rem", marginBottom: "0.5rem", lineHeight: 1.4 }}>{sc.title}</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{sc.provider}</p>
                  <div style={{ background: "rgba(255,183,0,0.08)", border: "1px solid rgba(255,183,0,0.2)", borderRadius: "8px", padding: "0.6rem 0.9rem", marginBottom: "1rem" }}>
                    <span style={{ color: "var(--color-gold)", fontWeight: 700, fontSize: "0.875rem" }}>💰 {sc.amount}</span>
                  </div>
                  <ul style={{ marginBottom: "1rem" }}>
                    {sc.requirements.slice(0, 2).map((r) => (
                      <li key={r} style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>✓</span> {r}
                      </li>
                    ))}
                  </ul>
                  <a href={sc.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "0.6rem" }}>
                    Xem chi tiết
                  </a>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/hoc-bong" className="btn btn-primary">Xem tất cả học bổng →</Link>
            </div>
          </div>
        </section>

        {/* ── SCHOOLS ──────────────────────────────────────────────── */}
        <section className="section" style={{ background: "var(--color-bg-card)" }}>
          <div className="container">
            <div className="section-header">
              <div className="section-label">Trường học</div>
              <h2 className="section-title">Các trường <span className="gradient-text">đối tác</span> hàng đầu</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {schools.map((school) => (
                <div key={school.id} className="card" style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{school.name}</h3>
                      <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>📍 {school.city} · {school.region}</p>
                    </div>
                    <div style={{ background: "rgba(230,57,70,0.15)", color: "var(--color-primary)", borderRadius: "8px", padding: "0.4rem 0.75rem", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>
                      #{school.ranking}
                    </div>
                  </div>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>{school.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>Học phí/năm</span>
                      <div style={{ fontWeight: 700, color: "var(--color-gold)", fontSize: "0.9rem" }}>
                        ${school.tuitionMin.toLocaleString()} – ${school.tuitionMax.toLocaleString()} USD
                      </div>
                    </div>
                    {school.scholarships && <span className="badge badge-green">Có học bổng</span>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/truong-hoc" className="btn btn-primary">Xem tất cả trường →</Link>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE GUIDE ─────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Hướng dẫn</div>
              <h2 className="section-title">Kinh nghiệm <span className="gradient-text">thực tế</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                { icon: "📋", title: "Chuẩn bị hồ sơ", desc: "Danh sách đầy đủ giấy tờ cần thiết và cách nộp hồ sơ đúng chuẩn.", href: "/kinh-nghiem/ho-so" },
                { icon: "🎯", title: "Chọn ngành học", desc: "Mẹo chọn ngành phù hợp với thế mạnh và cơ hội việc làm sau này.", href: "/kinh-nghiem/chon-nganh" },
                { icon: "💳", title: "Chi phí sinh hoạt", desc: "Dự toán chi phí ăn ở, đi lại và sinh hoạt hàng tháng tại Đài Loan.", href: "/kinh-nghiem/chi-phi" },
                { icon: "🏠", title: "Tìm nhà ở", desc: "Ký túc xá hay thuê ngoài? So sánh ưu nhược điểm từng loại.", href: "/kinh-nghiem/nha-o" },
                { icon: "💼", title: "Làm thêm hợp pháp", desc: "Sinh viên được làm thêm tối đa 20h/tuần — tìm việc ở đâu?", href: "/kinh-nghiem/lam-them" },
                { icon: "🗣️", title: "Học tiếng Trung", desc: "Lộ trình học TOCFL từ zero đến Band B trong 12 tháng.", href: "/tieng-trung/tocfl" },
              ].map(({ icon, title, desc, href }) => (
                <Link key={href} href={href} className="experience-card">
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>{icon}</span>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{title}</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST POSTS ─────────────────────────────────────────── */}
        <section className="section" style={{ background: "var(--color-bg-card)" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div>
                <div className="section-label" style={{ justifyContent: "flex-start", marginBottom: "0.5rem" }}>Blog</div>
                <h2>Bài viết <span className="gradient-text">mới nhất</span></h2>
              </div>
              <Link href="/blog" className="btn btn-outline hide-mobile">Xem tất cả →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {latest.map((post) => (
                <article key={post.id} className="card" style={{ display: "flex", gap: "1rem", padding: "1rem", alignItems: "flex-start" }}>
                  <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0, borderRadius: "10px", overflow: "hidden" }}>
                    <Image src={post.coverImage || "/images/university-campus.png"} alt={post.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="badge badge-primary" style={{ marginBottom: "0.4rem" }}>{post.category}</span>
                    <h3 style={{ fontSize: "0.9rem", lineHeight: 1.4, marginBottom: "0.3rem" }}>
                      <Link href={`/bai-viet/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{post.title}</Link>
                    </h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>⏱ {post.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
        <AnimateOnScroll>
          <section className="section" style={{ background: "var(--color-bg-card)" }}>
            <div className="container">
              <div className="section-header">
                <div className="section-label">Cảm nhận</div>
                <h2 className="section-title">Sinh viên <span className="gradient-text">nói gì</span> về chúng tôi</h2>
                <p className="section-desc">Hàng trăm du học sinh Việt Nam đã thành công với sự đồng hành của DuHocToday.</p>
              </div>
              <TestimonialSlider />
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <AnimateOnScroll>
          <section className="section">
            <div className="container">
              <div className="section-header">
                <div className="section-label">Hỏi đáp</div>
                <h2 className="section-title">Câu hỏi <span className="gradient-text">thường gặp</span></h2>
              </div>
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <FAQAccordion
                  items={[
                    { q: "Du học Đài Loan tốn bao nhiêu tiền?", a: "Tổng chi phí khoảng 3.000 – 6.000 USD/năm (bao gồm học phí và sinh hoạt), rẻ hơn rất nhiều so với Mỹ, Úc, Nhật, Hàn. Nếu có học bổng, chi phí có thể giảm đáng kể." },
                    { q: "Có cần biết tiếng Trung không?", a: "Tùy hệ đào tạo. Hệ ngôn ngữ và dự bị không yêu cầu. Hệ tự túc cần TOCFL Band B hoặc có chương trình giảng dạy bằng tiếng Anh." },
                    { q: "Visa du học Đài Loan có khó xin không?", a: "Tỷ lệ đậu visa rất cao (trên 95%) nếu hồ sơ đầy đủ và chính xác. Nộp tại Văn phòng Kinh tế Văn hóa Đài Bắc tại Hà Nội hoặc TP.HCM." },
                    { q: "Có được làm thêm khi du học không?", a: "Sinh viên đại học chính quy được phép làm thêm tối đa 20 giờ/tuần. Nghỉ hè/nghỉ đông có thể làm full-time. Hệ ngôn ngữ không được phép làm thêm." },
                    { q: "Học xong có thể ở lại Đài Loan làm việc không?", a: "Có! Chính phủ Đài Loan có chính sách Evaluation Point System cho phép sinh viên quốc tế tốt nghiệp xin giấy phép lao động và ở lại làm việc." },
                  ]}
                />
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <Link href="/kinh-nghiem/hoi-dap" className="btn btn-outline">Xem tất cả câu hỏi →</Link>
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── PARTNERS ────────────────────────────────────────────────── */}
        <AnimateOnScroll>
          <section className="section-sm" style={{ background: "var(--color-bg-card)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
            <div className="container" style={{ textAlign: "center" }}>
              <p style={{ color: "var(--color-text-dim)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2rem" }}>
                Trường đối tác hàng đầu
              </p>
              <div className="partner-strip">
                {["NTU", "NTHU", "NCKU", "NYCU", "NCCU", "NTU", "NTHU", "NCKU", "NYCU", "NCCU"].map((name, i) => (
                  <div key={i} className="partner-logo">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div style={{
              background: "linear-gradient(135deg, var(--color-secondary) 0%, #0B0F1A 100%)",
              border: "1px solid rgba(69,123,157,0.3)",
              borderRadius: "var(--radius-xl)", padding: "4rem 2rem", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--gradient-glow)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🎓</span>
                <h2 style={{ marginBottom: "1rem" }}>Sẵn sàng bắt đầu hành trình du học?</h2>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
                  Đội ngũ chuyên gia DuHocToday sẽ tư vấn miễn phí và đồng hành cùng bạn từ A đến Z.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/tu-van" className="btn btn-primary">Đăng ký tư vấn miễn phí</Link>
                  <Link href="/dich-vu" className="btn btn-outline">Xem dịch vụ</Link>
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
