"use client";

// ─── Notion Block → React Renderer ────────────────────────────────────────
// Renders Notion API block objects as styled React components
// Used in /bai-viet/[slug] for rendering full article content from Notion

import Image from "next/image";

interface RichTextItem {
  type: "text";
  text: { content: string; link?: { url: string } | null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
}

interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}

function renderRichText(richText: RichTextItem[]) {
  return richText.map((item, i) => {
    let content: React.ReactNode = item.plain_text;
    const { bold, italic, code, strikethrough, underline } = item.annotations;

    if (code) {
      content = (
        <code
          key={i}
          style={{
            background: "rgba(255,255,255,0.06)",
            padding: "0.15em 0.4em",
            borderRadius: "4px",
            fontSize: "0.85em",
            fontFamily: "monospace",
            color: "var(--color-primary-light)",
          }}
        >
          {content}
        </code>
      );
      return content;
    }

    const style: React.CSSProperties = {};
    if (bold) style.fontWeight = 700;
    if (italic) style.fontStyle = "italic";
    if (strikethrough) style.textDecoration = "line-through";
    if (underline) style.textDecoration = "underline";

    if (item.text.link) {
      return (
        <a
          key={i}
          href={item.text.link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--color-primary)",
            textDecoration: "underline",
            ...style,
          }}
        >
          {content}
        </a>
      );
    }

    if (Object.keys(style).length > 0) {
      return (
        <span key={i} style={style}>
          {content}
        </span>
      );
    }

    return <span key={i}>{content}</span>;
  });
}

function NotionBlockRenderer({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          style={{
            color: "var(--color-text-muted)",
            lineHeight: 1.8,
            marginBottom: "1rem",
            fontSize: "0.95rem",
          }}
        >
          {renderRichText(block.paragraph.rich_text)}
        </p>
      );

    case "heading_1":
      return (
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "var(--color-text)",
          }}
        >
          {renderRichText(block.heading_1.rich_text)}
        </h2>
      );

    case "heading_2":
      return (
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            marginTop: "2rem",
            marginBottom: "0.75rem",
            color: "var(--color-text)",
          }}
        >
          {renderRichText(block.heading_2.rich_text)}
        </h3>
      );

    case "heading_3":
      return (
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            color: "var(--color-text)",
          }}
        >
          {renderRichText(block.heading_3.rich_text)}
        </h4>
      );

    case "bulleted_list_item":
      return (
        <li
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "var(--color-text-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
              flexShrink: 0,
              marginTop: "0.1em",
            }}
          >
            •
          </span>
          <span>{renderRichText(block.bulleted_list_item.rich_text)}</span>
        </li>
      );

    case "numbered_list_item":
      return (
        <li
          style={{
            marginBottom: "0.5rem",
            color: "var(--color-text-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            paddingLeft: "0.5rem",
          }}
        >
          {renderRichText(block.numbered_list_item.rich_text)}
        </li>
      );

    case "code":
      return (
        <pre
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "1.25rem",
            overflow: "auto",
            marginBottom: "1.5rem",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            fontFamily: "monospace",
            color: "var(--color-text)",
          }}
        >
          <code>{block.code.rich_text.map((t: RichTextItem) => t.plain_text).join("")}</code>
        </pre>
      );

    case "quote":
      return (
        <blockquote
          style={{
            borderLeft: "3px solid var(--color-primary)",
            paddingLeft: "1.25rem",
            margin: "1.5rem 0",
            fontStyle: "italic",
            color: "var(--color-text-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      );

    case "callout":
      return (
        <div
          style={{
            background: "rgba(230,57,70,0.06)",
            border: "1px solid rgba(230,57,70,0.2)",
            borderRadius: "var(--radius-md)",
            padding: "1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.75rem",
            fontSize: "0.9rem",
            lineHeight: 1.7,
          }}
        >
          {block.callout.icon?.emoji && (
            <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
              {block.callout.icon.emoji}
            </span>
          )}
          <div style={{ color: "var(--color-text-muted)" }}>
            {renderRichText(block.callout.rich_text)}
          </div>
        </div>
      );

    case "image": {
      const url =
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external.url;
      const caption = block.image.caption?.[0]?.plain_text;
      return (
        <figure style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
            }}
          >
            <Image
              src={url}
              alt={caption || ""}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {caption && (
            <figcaption
              style={{
                textAlign: "center",
                color: "var(--color-text-dim)",
                fontSize: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "divider":
      return (
        <div className="divider" style={{ margin: "2rem 0" }} />
      );

    default:
      return null;
  }
}

// ─── Main Renderer ──────────────────────────────────────────────────────────

interface NotionRendererProps {
  blocks: NotionBlock[];
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  // Group consecutive list items
  const grouped: (NotionBlock | NotionBlock[])[] = [];
  let currentList: NotionBlock[] | null = null;
  let listType: string | null = null;

  for (const block of blocks) {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      if (listType === block.type) {
        currentList!.push(block);
      } else {
        if (currentList) grouped.push(currentList);
        currentList = [block];
        listType = block.type;
      }
    } else {
      if (currentList) {
        grouped.push(currentList);
        currentList = null;
        listType = null;
      }
      grouped.push(block);
    }
  }
  if (currentList) grouped.push(currentList);

  return (
    <div>
      {grouped.map((item, i) => {
        if (Array.isArray(item)) {
          const Tag = item[0].type === "numbered_list_item" ? "ol" : "ul";
          return (
            <Tag
              key={i}
              style={{
                marginBottom: "1rem",
                paddingLeft: Tag === "ol" ? "1.5rem" : "0",
                listStyle: Tag === "ol" ? "decimal" : "none",
              }}
            >
              {item.map((block) => (
                <NotionBlockRenderer key={block.id} block={block} />
              ))}
            </Tag>
          );
        }
        return <NotionBlockRenderer key={(item as NotionBlock).id} block={item as NotionBlock} />;
      })}
    </div>
  );
}
