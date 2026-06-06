"use client";
import { useState, useMemo } from "react";
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/notion";

const POSTS_PER_PAGE = 12;

export default function BlogList({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["Tất cả", ...Array.from(cats).sort()];
  }, [posts]);

  // Filter posts
  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "Tất cả") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset page when filter changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Search + Stats */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 300px", maxWidth: "400px" }}>
          <span
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1rem",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem 0.75rem 2.75rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-card)",
              color: "var(--color-text)",
              fontSize: "0.9rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length} bài viết
          {activeCategory !== "Tất cả" && ` trong "${activeCategory}"`}
        </span>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          const count =
            cat === "Tất cả"
              ? posts.length
              : posts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                padding: "0.5rem 1.1rem",
                borderRadius: "999px",
                border: isActive
                  ? "1.5px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                background: isActive
                  ? "rgba(230,57,70,0.15)"
                  : "var(--color-bg-card)",
                color: isActive
                  ? "var(--color-primary-light)"
                  : "var(--color-text-muted)",
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {cat}
              <span
                style={{
                  fontSize: "0.72rem",
                  background: isActive
                    ? "var(--color-primary)"
                    : "rgba(255,255,255,0.08)",
                  color: isActive ? "#fff" : "var(--color-text-dim)",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "999px",
                  fontWeight: 600,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      {paged.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {paged.map((post) => (
            <PostCard key={post.slug || post.id} post={post} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "var(--color-text-muted)",
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</p>
          <p style={{ fontSize: "1rem" }}>
            Không tìm thấy bài viết nào
            {search && ` cho "${search}"`}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "3rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-card)",
              color:
                currentPage === 1
                  ? "var(--color-text-dim)"
                  : "var(--color-text)",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.4 : 1,
              fontSize: "0.85rem",
              transition: "all 0.2s",
            }}
          >
            ← Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // Show first, last, current, and neighbors
              if (page === 1 || page === totalPages) return true;
              if (Math.abs(page - currentPage) <= 1) return true;
              return false;
            })
            .reduce((acc: (number | "...")[], page, idx, arr) => {
              if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                acc.push("...");
              }
              acc.push(page);
              return acc;
            }, [])
            .map((item, idx) =>
              item === "..." ? (
                <span
                  key={`dots-${idx}`}
                  style={{
                    padding: "0.55rem 0.3rem",
                    color: "var(--color-text-dim)",
                    fontSize: "0.85rem",
                  }}
                >
                  ···
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item as number)}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "var(--radius-sm)",
                    border:
                      item === currentPage
                        ? "1.5px solid var(--color-primary)"
                        : "1px solid var(--color-border)",
                    background:
                      item === currentPage
                        ? "var(--color-primary)"
                        : "var(--color-bg-card)",
                    color:
                      item === currentPage
                        ? "#fff"
                        : "var(--color-text-muted)",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: item === currentPage ? 700 : 400,
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item}
                </button>
              )
            )}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-card)",
              color:
                currentPage === totalPages
                  ? "var(--color-text-dim)"
                  : "var(--color-text)",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.4 : 1,
              fontSize: "0.85rem",
              transition: "all 0.2s",
            }}
          >
            Tiếp →
          </button>
        </div>
      )}
    </>
  );
}
