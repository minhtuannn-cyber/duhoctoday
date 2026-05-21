import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/notion";

interface PostCardProps {
  post: Post;
  variant?: "full" | "compact";
}

export default function PostCard({ post, variant = "full" }: PostCardProps) {
  if (variant === "compact") {
    return (
      <article
        className="card"
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Image
            src={post.coverImage || "/images/university-campus.png"}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="badge badge-primary" style={{ marginBottom: "0.4rem" }}>
            {post.category}
          </span>
          <h3 style={{ fontSize: "0.9rem", lineHeight: 1.4, marginBottom: "0.3rem" }}>
            <Link
              href={`/bai-viet/${post.slug}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {post.title}
            </Link>
          </h3>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>
            ⏱ {post.readTime}
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <Image
          src={post.coverImage || "/images/hero-banner.png"}
          alt={post.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(11,15,26,0.8), transparent)",
          }}
        />
        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
          <span className="badge badge-primary">{post.category}</span>
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ marginBottom: "0.75rem", fontSize: "1.05rem", lineHeight: 1.4 }}>
          <Link
            href={`/bai-viet/${post.slug}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {post.title}
          </Link>
        </h3>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "0.875rem",
            marginBottom: "1rem",
            lineHeight: 1.6,
          }}
        >
          {post.excerpt}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>
            ⏱ {post.readTime}
          </span>
          <Link href={`/bai-viet/${post.slug}`} className="read-more-link">
            Đọc thêm →
          </Link>
        </div>
      </div>
    </article>
  );
}
