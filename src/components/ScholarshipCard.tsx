import type { Scholarship } from "@/lib/notion";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export default function ScholarshipCard({ scholarship: sc }: ScholarshipCardProps) {
  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <span
          className={`badge ${
            sc.type === "full"
              ? "badge-gold"
              : sc.type === "partial"
              ? "badge-blue"
              : "badge-green"
          }`}
        >
          {sc.type === "full"
            ? "Toàn phần"
            : sc.type === "partial"
            ? "Bán phần"
            : "Ngôn ngữ"}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>
          HH: {sc.deadline}
        </span>
      </div>
      <h3
        style={{
          fontSize: "0.95rem",
          marginBottom: "0.5rem",
          lineHeight: 1.4,
        }}
      >
        {sc.title}
      </h3>
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "0.8rem",
          marginBottom: "0.75rem",
        }}
      >
        {sc.provider}
      </p>
      <div
        style={{
          background: "rgba(255,183,0,0.08)",
          border: "1px solid rgba(255,183,0,0.2)",
          borderRadius: "8px",
          padding: "0.6rem 0.9rem",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            color: "var(--color-gold)",
            fontWeight: 700,
            fontSize: "0.875rem",
          }}
        >
          💰 {sc.amount}
        </span>
      </div>
      <ul style={{ marginBottom: "1rem" }}>
        {sc.requirements.map((r) => (
          <li
            key={r}
            style={{
              display: "flex",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              marginBottom: "0.3rem",
            }}
          >
            <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>
              ✓
            </span>
            {r}
          </li>
        ))}
      </ul>
      <a
        href={sc.link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
        style={{
          width: "100%",
          justifyContent: "center",
          fontSize: "0.85rem",
          padding: "0.6rem",
        }}
      >
        Xem chi tiết
      </a>
    </div>
  );
}
