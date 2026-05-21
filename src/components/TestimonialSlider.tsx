"use client";
import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  name: string;
  school: string;
  year: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Nguyễn Thị Minh Anh",
    school: "Đại học Quốc gia Đài Loan (NTU)",
    year: "2023",
    quote:
      "DuHocToday đã giúp mình hoàn thành hồ sơ xin học bổng MOE chỉ trong 2 tuần. Giờ mình đã là sinh viên năm 2 tại NTU với học bổng toàn phần!",
    avatar: "MA",
  },
  {
    name: "Trần Văn Hoàng",
    school: "Đại học Long Hoa",
    year: "2024",
    quote:
      "Mình chọn hệ vừa học vừa làm và hoàn toàn hài lòng. Thu nhập đủ trang trải cuộc sống, lại có bằng đại học. Cảm ơn DuHocToday đã tư vấn!",
    avatar: "VH",
  },
  {
    name: "Lê Thị Thanh Huyền",
    school: "Đại học Thanh Hoa (NTHU)",
    year: "2022",
    quote:
      "Từ zero tiếng Trung, mình đã đạt TOCFL Band B sau 10 tháng nhờ lộ trình của DuHocToday. Giờ mình học thạc sĩ ngành AI tại NTHU!",
    avatar: "TH",
  },
  {
    name: "Phạm Đức Anh",
    school: "Đại học Thành Công (NCKU)",
    year: "2023",
    quote:
      "Đội ngũ tư vấn rất tận tâm. Mình gặp vấn đề visa nhưng được hỗ trợ giải quyết nhanh chóng. Đài Loan là lựa chọn tuyệt vời!",
    avatar: "ĐA",
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = testimonials[active];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
    >
      <div
        key={active}
        style={{
          animation: "fadeIn 0.5s ease",
          padding: "2rem",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--gradient-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#fff",
            margin: "0 auto 1.5rem",
            boxShadow: "0 4px 20px rgba(230,57,70,0.3)",
          }}
        >
          {t.avatar}
        </div>

        {/* Quote */}
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.8,
            color: "var(--color-text)",
            marginBottom: "1.5rem",
            fontStyle: "italic",
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Info */}
        <div>
          <div style={{ fontWeight: 700, fontSize: "1rem" }}>{t.name}</div>
          <div
            style={{
              color: "var(--color-primary)",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {t.school}
          </div>
          <div style={{ color: "var(--color-text-dim)", fontSize: "0.8rem" }}>
            Khóa {t.year}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Testimonial ${i + 1}`}
            style={{
              width: i === active ? "2rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "4px",
              background:
                i === active ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
