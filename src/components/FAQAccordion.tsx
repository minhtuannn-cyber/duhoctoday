"use client";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              background: isOpen
                ? "var(--gradient-card)"
                : "rgba(255,255,255,0.02)",
              border: `1px solid ${
                isOpen ? "rgba(230,57,70,0.3)" : "var(--color-border)"
              }`,
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.25rem 1.5rem",
                background: "none",
                border: "none",
                color: isOpen
                  ? "var(--color-text)"
                  : "var(--color-text-muted)",
                fontSize: "0.95rem",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "inherit",
                lineHeight: 1.4,
                gap: "1rem",
              }}
            >
              <span>{item.q}</span>
              <span
                style={{
                  flexShrink: 0,
                  fontSize: "1.2rem",
                  color: isOpen
                    ? "var(--color-primary)"
                    : "var(--color-text-dim)",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}
            >
              <div
                style={{
                  padding: "0 1.5rem 1.25rem",
                  color: "var(--color-text-muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                }}
              >
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
