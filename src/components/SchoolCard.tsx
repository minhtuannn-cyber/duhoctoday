import type { School } from "@/lib/notion";

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
            {school.name}
          </h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
            📍 {school.city} · {school.region}
          </p>
        </div>
        <div
          style={{
            background: "rgba(230,57,70,0.15)",
            color: "var(--color-primary)",
            borderRadius: "8px",
            padding: "0.4rem 0.75rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          #{school.ranking}
        </div>
      </div>
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "0.85rem",
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}
      >
        {school.description}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}
          >
            Học phí/năm
          </span>
          <div
            style={{
              fontWeight: 700,
              color: "var(--color-gold)",
              fontSize: "0.9rem",
            }}
          >
            ${school.tuitionMin.toLocaleString()} –{" "}
            ${school.tuitionMax.toLocaleString()} USD
          </div>
        </div>
        {school.scholarships && (
          <span className="badge badge-green">Có học bổng</span>
        )}
      </div>
      {school.website && (
        <a
          href={school.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{
            width: "100%",
            justifyContent: "center",
            fontSize: "0.85rem",
            padding: "0.6rem",
            marginTop: "1rem",
          }}
        >
          Xem website trường →
        </a>
      )}
    </div>
  );
}
