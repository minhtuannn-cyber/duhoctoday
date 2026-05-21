"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SchoolCard from "@/components/SchoolCard";
import { getMockSchools } from "@/lib/notion";
import Link from "next/link";

const regions = [
  { label: "Tất cả", value: "" },
  { label: "🏔️ Miền Bắc", value: "Miền Bắc" },
  { label: "🌾 Miền Trung", value: "Miền Trung" },
  { label: "🌊 Miền Nam", value: "Miền Nam" },
];

export default function TruongHocPage() {
  const [activeRegion, setActiveRegion] = useState("");
  const allSchools = getMockSchools();
  const filtered = activeRegion
    ? allSchools.filter((s) => s.region === activeRegion)
    : allSchools;

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Trường đại học tại Đài Loan"
          subtitle="Khám phá hơn 150 trường đại học chất lượng cao tại Đài Loan — từ các đại học nghiên cứu top đầu châu Á đến các trường ứng dụng đa ngành. Tìm ngôi trường phù hợp nhất cho hành trình du học của bạn."
          backgroundImage="/images/university-campus.png"
          breadcrumbs={[{ label: "Trường học" }]}
          badge="🎓 HỆ THỐNG TRƯỜNG HỌC"
        />

        {/* Quick links */}
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
              overflowX: "auto",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/truong-hoc/mien-bac"
              className="btn btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
            >
              Miền Bắc
            </Link>
            <Link
              href="/truong-hoc/mien-trung"
              className="btn btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
            >
              Miền Trung
            </Link>
            <Link
              href="/truong-hoc/mien-nam"
              className="btn btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
            >
              Miền Nam
            </Link>
            <Link
              href="/truong-hoc/xep-hang"
              className="btn btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
            >
              📊 Bảng xếp hạng
            </Link>
          </div>
        </section>

        {/* Filter & School Grid */}
        <section className="section">
          <div className="container">
            {/* Section header */}
            <div className="section-header">
              <div className="section-label">Danh sách trường</div>
              <h2 className="section-title">
                Tìm trường đại học{" "}
                <span className="gradient-text">phù hợp với bạn</span>
              </h2>
              <p className="section-desc">
                Lọc theo khu vực để tìm kiếm trường phù hợp với nhu cầu và ngân
                sách của bạn
              </p>
            </div>

            {/* Filter buttons */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
                marginBottom: "3rem",
                flexWrap: "wrap",
              }}
            >
              {regions.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setActiveRegion(r.value)}
                  className={`btn ${
                    activeRegion === r.value ? "btn-primary" : "btn-outline"
                  }`}
                  style={{ fontSize: "0.875rem", padding: "0.6rem 1.5rem" }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                Hiển thị{" "}
                <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>
                  {filtered.length}
                </span>{" "}
                trường
                {activeRegion && (
                  <span>
                    {" "}
                    tại{" "}
                    <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
                      {activeRegion}
                    </span>
                  </span>
                )}
              </p>
            </div>

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filtered.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
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
                  Vui lòng thử chọn khu vực khác hoặc liên hệ tư vấn để được hỗ
                  trợ
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
              Cần tư vấn chọn trường{" "}
              <span className="gradient-text-gold">phù hợp?</span>
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "2rem",
                maxWidth: "500px",
                margin: "0 auto 2rem",
              }}
            >
              Đội ngũ tư vấn của DuHocToday sẽ giúp bạn lựa chọn trường phù hợp
              với năng lực, ngành học và ngân sách
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
