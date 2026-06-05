"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  {
    label: "Trường học",
    href: "/truong-hoc",
    children: [
      { label: "Miền Bắc (Đài Bắc, Tân Bắc...)", href: "/truong-hoc/mien-bac" },
      { label: "Miền Trung (Đài Trung...)", href: "/truong-hoc/mien-trung" },
      { label: "Miền Nam (Cao Hùng, Đài Nam...)", href: "/truong-hoc/mien-nam" },
      { label: "Bảng xếp hạng trường", href: "/truong-hoc/xep-hang" },
    ],
  },
  {
    label: "Học bổng",
    href: "/hoc-bong",
    children: [
      { label: "Học bổng chính phủ (MOE, ICDF)", href: "/hoc-bong/chinh-phu" },
      { label: "Học bổng từ trường", href: "/hoc-bong/tu-truong" },
      { label: "Học bổng tiếng Hoa HES", href: "/hoc-bong/hes" },
      { label: "Kinh nghiệm xin học bổng", href: "/hoc-bong/kinh-nghiem" },
    ],
  },
  {
    label: "Hệ học",
    href: "/he-hoc",
    children: [
      { label: "Hệ Ngôn ngữ", href: "/he-hoc/ngon-ngu" },
      { label: "Hệ Tự túc (Chính quy)", href: "/he-hoc/tu-tuc" },
      { label: "Hệ Dự bị 1+4", href: "/he-hoc/du-bi" },
      { label: "Hệ Vừa học vừa làm", href: "/he-hoc/vhvl" },
      { label: "Hệ Hoa Kiều", href: "/he-hoc/hoa-kieu" },
      { label: "Hệ INTENSE & Exchange", href: "/he-hoc/intense" },
    ],
  },
  {
    label: "Kinh nghiệm",
    href: "/kinh-nghiem",
    children: [
      { label: "Hồ sơ du học", href: "/kinh-nghiem/ho-so" },
      { label: "Cuộc sống tại Đài Loan", href: "/kinh-nghiem/cuoc-song" },
      { label: "Văn hóa & Du lịch", href: "/kinh-nghiem/van-hoa" },
      { label: "Hỏi đáp du học", href: "/kinh-nghiem/hoi-dap" },
    ],
  },
  {
    label: "Tiếng Trung",
    href: "/tieng-trung",
    children: [
      { label: "Luyện thi TOCFL", href: "/tieng-trung/tocfl" },
      { label: "Từ vựng tiếng Trung", href: "/tieng-trung/tu-vung" },
      { label: "Ngữ pháp tiếng Trung", href: "/tieng-trung/ngu-phap" },
      { label: "Tài liệu học", href: "/tieng-trung/tai-lieu" },
    ],
  },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Tin tức", href: "/blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div style={{ background: "var(--color-primary)", padding: "0.35rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem" }}>
          <span>📞 Tư vấn miễn phí: <a href="tel:+84915525597" style={{ fontWeight: 600 }}>0915 525 597</a></span>
          <span>✉️ <a href="mailto:info@duhoctoday.vn">info@duhoctoday.vn</a></span>
        </div>
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 1000,
        background: scrolled ? "rgba(11,15,26,0.95)" : "rgba(11,15,26,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", height: "68px", gap: "2rem" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--gradient-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", fontWeight: 900, color: "#fff",
              boxShadow: "0 4px 12px rgba(230,57,70,0.4)"
            }}>D</div>
            <span style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
              DuHoc<span className="gradient-text">Today</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: 1 }}>
            {navItems.map((item) => (
              <div
                key={item.href}
                style={{ position: "relative" }}
                onMouseEnter={() => setActiveMenu(item.href)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link href={item.href} style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0.75rem", borderRadius: "8px",
                  fontSize: "0.9rem", fontWeight: 500,
                  color: activeMenu === item.href ? "var(--color-primary-light)" : "var(--color-text)",
                  background: activeMenu === item.href ? "rgba(230,57,70,0.08)" : "transparent",
                  transition: "all 0.2s",
                }}>
                  {item.label}
                  {item.children && <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>▼</span>}
                </Link>

                {item.children && activeMenu === item.href && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", left: 0,
                    background: "var(--color-bg-card)", border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)", padding: "0.5rem",
                    minWidth: "220px", boxShadow: "var(--shadow-card)",
                    zIndex: 100,
                  }}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} style={{
                        display: "block", padding: "0.6rem 0.9rem",
                        borderRadius: "8px", fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        transition: "all 0.2s",
                      }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hide-mobile" style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
            <Link href="/tu-van" className="btn btn-primary" style={{ padding: "0.55rem 1.25rem", fontSize: "0.875rem" }}>
              🎓 Tư vấn miễn phí
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ marginLeft: "auto", fontSize: "1.5rem", color: "var(--color-text)" }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: "var(--color-bg-card)", borderTop: "1px solid var(--color-border)",
            padding: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem",
          }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
            <Link href="/tu-van" className="btn btn-primary" style={{ marginTop: "0.5rem", justifyContent: "center" }}>
              🎓 Tư vấn miễn phí
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
