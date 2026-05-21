import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.85rem",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{
          color: "var(--color-text-muted)",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        className="hover-primary"
      >
        🏠 Trang chủ
      </Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "var(--color-text-dim)", fontSize: "0.7rem" }}>
            ›
          </span>
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              className="hover-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--color-primary-light, var(--color-primary))" }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
