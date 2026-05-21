import Image from "next/image";
import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  compact?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage = "/images/hero-banner.png",
  breadcrumbs,
  badge,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: compact ? "280px" : "400px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={backgroundImage}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(11,15,26,0.95) 40%, rgba(11,15,26,0.7))",
          }}
        />
      </div>
      <div
        className="container"
        style={{ position: "relative", zIndex: 1, padding: "3rem 1.5rem" }}
      >
        <Breadcrumb items={breadcrumbs} />
        <div style={{ maxWidth: "700px", marginTop: "1.5rem" }}>
          {badge && (
            <div
              className="badge badge-primary"
              style={{ marginBottom: "1rem" }}
            >
              {badge}
            </div>
          )}
          <h1
            style={{
              marginBottom: subtitle ? "1rem" : 0,
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: "600px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
