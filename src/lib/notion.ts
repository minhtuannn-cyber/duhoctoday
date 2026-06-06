// @ts-nocheck — Using direct Notion REST API (fetch) to avoid Turbopack tree-shaking issues with SDK

const NOTION_API_KEY = process.env.NOTION_API_KEY || "";
const NOTION_VERSION = "2022-06-28";

async function notionFetch(endpoint: string, body?: any): Promise<any> {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: body ? "POST" : "GET",
    headers: {
      "Authorization": `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API ${res.status}: ${text}`);
  }
  return res.json();
}

// ─── Simple In-Memory Cache ────────────────────────────────────────────────

interface CacheEntry<T> {
  data: T;
  expires: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T, ttl = CACHE_TTL): void {
  cache.set(key, { data, expires: Date.now() + ttl });
}

// ─── Types ─────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export interface School {
  id: string;
  name: string;
  region: string;
  city: string;
  type: string;
  ranking: number;
  tuitionMin: number;
  tuitionMax: number;
  scholarships: boolean;
  website: string;
  logo: string;
  description: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  type: string; // "full" | "partial" | "language"
  amount: string;
  deadline: string;
  requirements: string[];
  link: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function getProp(page: any, key: string): any {
  return page.properties?.[key];
}

function getText(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (prop.type === "select") return prop.select?.name ?? "";
  if (prop.type === "number") return prop.number ?? 0;
  if (prop.type === "checkbox") return prop.checkbox ?? false;
  if (prop.type === "url") return prop.url ?? "";
  if (prop.type === "date") return prop.date?.start ?? "";
  if (prop.type === "multi_select")
    return prop.multi_select?.map((s: any) => s.name) ?? [];
  if (prop.type === "files")
    return prop.files?.[0]?.file?.url ?? prop.files?.[0]?.external?.url ?? "";
  return "";
}

// ─── Posts ─────────────────────────────────────────────────────────────────

export async function getPosts(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Post[]> {
  try {
    const dbId = process.env.NOTION_POSTS_DB_ID;
    console.log("[getPosts] NOTION_POSTS_DB_ID:", dbId ? `${dbId.slice(0, 8)}...` : "MISSING");
    console.log("[getPosts] NOTION_API_KEY:", process.env.NOTION_API_KEY ? "SET" : "MISSING");
    if (!dbId) return getMockPosts();

    const filter: any = { and: [] };
    if (options?.category) {
      filter.and.push({
        property: "Category",
        select: { equals: options.category },
      });
    }
    if (options?.featured !== undefined) {
      filter.and.push({
        property: "Featured",
        checkbox: { equals: options.featured },
      });
    }

    const response = await notionFetch(`/databases/${dbId}/query`, {
      filter: filter.and.length ? filter : undefined,
      sorts: [{ property: "PublishedAt", direction: "descending" }],
      page_size: options?.limit ?? 100,
    });

    console.log("[getPosts] Notion returned", response.results.length, "results");

    return response.results
      .filter((p: any) => "properties" in p)
      .map((page) => ({
        id: page.id,
        title: getText(getProp(page, "Title")) || getText(getProp(page, "Name")),
        slug: getText(getProp(page, "Slug")),
        excerpt: getText(getProp(page, "Excerpt")),
        category: getText(getProp(page, "Category")),
        tags: getText(getProp(page, "Tags")) as unknown as string[],
        coverImage: getText(getProp(page, "CoverImage")),
        publishedAt: getText(getProp(page, "PublishedAt")),
        readTime: getText(getProp(page, "ReadTime")),
        featured: getText(getProp(page, "Featured")) as unknown as boolean,
      }));
  } catch (error) {
    console.error("[getPosts] ERROR — falling back to mock:", error);
    return getMockPosts();
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const dbId = process.env.NOTION_POSTS_DB_ID;
    if (!dbId) return getMockPosts().find((p) => p.slug === slug) ?? null;

    const response = await notionFetch(`/databases/${dbId}/query`, {
      filter: { property: "Slug", rich_text: { equals: slug } },
    });

    const page = response.results[0];
    if (!page) return null;

    return {
      id: page.id,
      title: getText(getProp(page, "Title")) || getText(getProp(page, "Name")),
      slug: getText(getProp(page, "Slug")),
      excerpt: getText(getProp(page, "Excerpt")),
      category: getText(getProp(page, "Category")),
      tags: getText(getProp(page, "Tags")) as unknown as string[],
      coverImage: getText(getProp(page, "CoverImage")),
      publishedAt: getText(getProp(page, "PublishedAt")),
      readTime: getText(getProp(page, "ReadTime")),
      featured: getText(getProp(page, "Featured")) as unknown as boolean,
    };
  } catch {
    return getMockPosts().find((p) => p.slug === slug) ?? null;
  }
}

// ─── Post Content (Notion Blocks) ──────────────────────────────────────────

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getPostContent(pageId: string): Promise<any[]> {
  try {
    // Skip Notion API call if pageId is not a valid UUID (e.g. mock data IDs like "1", "2")
    if (!UUID_REGEX.test(pageId)) return [];

    const cacheKey = `content:${pageId}`;
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;

    const blocks: any[] = [];
    let cursor: string | undefined = undefined;

    do {
      const params = new URLSearchParams({ page_size: "100" });
      if (cursor) params.set("start_cursor", cursor);
      const response = await notionFetch(`/blocks/${pageId}/children?${params}`);

      blocks.push(...response.results);
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor);

    setCache(cacheKey, blocks);
    return blocks;
  } catch (error) {
    console.error("Error fetching post content:", error);
    return [];
  }
}

// ─── Schools ───────────────────────────────────────────────────────────────

export async function getSchools(region?: string): Promise<School[]> {
  try {
    const dbId = process.env.NOTION_SCHOOLS_DB_ID;
    if (!dbId) return getMockSchools(region);

    const filter: any = region
      ? { property: "Region", select: { equals: region } }
      : undefined;

    const response = await notionFetch(`/databases/${dbId}/query`, {
      filter,
      sorts: [{ property: "Ranking", direction: "ascending" }],
    });

    return response.results
      .filter((p: any) => "properties" in p)
      .map((page) => ({
        id: page.id,
        name: getText(getProp(page, "Name")),
        region: getText(getProp(page, "Region")),
        city: getText(getProp(page, "City")),
        type: getText(getProp(page, "Type")),
        ranking: getText(getProp(page, "Ranking")) as unknown as number,
        tuitionMin: getText(getProp(page, "TuitionMin")) as unknown as number,
        tuitionMax: getText(getProp(page, "TuitionMax")) as unknown as number,
        scholarships: getText(
          getProp(page, "Scholarships")
        ) as unknown as boolean,
        website: getText(getProp(page, "Website")),
        logo: getText(getProp(page, "Logo")),
        description: getText(getProp(page, "Description")),
      }));
  } catch {
    return getMockSchools(region);
  }
}

// ─── Scholarships ──────────────────────────────────────────────────────────

export async function getScholarships(): Promise<Scholarship[]> {
  try {
    const dbId = process.env.NOTION_SCHOLARSHIPS_DB_ID;
    if (!dbId) return getMockScholarships();

    const response = await notionFetch(`/databases/${dbId}/query`, {
      sorts: [{ property: "Deadline", direction: "ascending" }],
    });

    return response.results
      .filter((p: any) => "properties" in p)
      .map((page) => ({
        id: page.id,
        title: getText(getProp(page, "Title")),
        provider: getText(getProp(page, "Provider")),
        type: getText(getProp(page, "Type")),
        amount: getText(getProp(page, "Amount")),
        deadline: getText(getProp(page, "Deadline")),
        requirements: getText(
          getProp(page, "Requirements")
        ) as unknown as string[],
        link: getText(getProp(page, "Link")),
      }));
  } catch {
    return getMockScholarships();
  }
}

// ─── Mock Data (fallback khi chưa cấu hình Notion) ─────────────────────────

export function getMockPosts(category?: string): Post[] {
  const all: Post[] = [
    {
      id: "1",
      title: "Tại sao nên chọn du học Đài Loan năm 2025?",
      slug: "tai-sao-nen-chon-du-hoc-dai-loan",
      excerpt:
        "Đài Loan nổi bật với chi phí hợp lý, nhiều học bổng hấp dẫn và môi trường giáo dục chất lượng cao – lý do ngày càng nhiều sinh viên Việt Nam chọn đây làm điểm đến.",
      category: "Kinh nghiệm",
      tags: ["du học", "đài loan", "học bổng"],
      coverImage: "/images/hero-banner.png",
      publishedAt: "2025-01-15",
      readTime: "5 phút",
      featured: true,
    },
    {
      id: "2",
      title: "Điều kiện và hồ sơ du học Đài Loan cần chuẩn bị",
      slug: "dieu-kien-ho-so-du-hoc-dai-loan",
      excerpt:
        "Hướng dẫn chi tiết về điều kiện học vấn, tài chính, visa và cách chuẩn bị bộ hồ sơ du học Đài Loan đầy đủ, chính xác nhất.",
      category: "Hồ sơ",
      tags: ["hồ sơ", "visa", "điều kiện"],
      coverImage: "/images/university-campus.png",
      publishedAt: "2025-02-10",
      readTime: "8 phút",
      featured: true,
    },
    {
      id: "3",
      title: "Top 10 trường đại học tốt nhất Đài Loan 2025",
      slug: "top-truong-dai-hoc-dai-loan",
      excerpt:
        "Danh sách các trường đại học hàng đầu Đài Loan theo bảng xếp hạng QS World 2025, kèm thông tin học phí và ngành học nổi bật.",
      category: "Trường học",
      tags: ["trường đại học", "xếp hạng", "NTU"],
      coverImage: "/images/university-campus.png",
      publishedAt: "2025-03-05",
      readTime: "10 phút",
      featured: false,
    },
    {
      id: "4",
      title: "Kinh nghiệm thi TOCFL – Chứng chỉ tiếng Trung cho du học sinh",
      slug: "kinh-nghiem-thi-tocfl",
      excerpt:
        "Tổng hợp kinh nghiệm ôn thi TOCFL từ Band A đến Band C, tài liệu học và lộ trình chuẩn bị hiệu quả nhất.",
      category: "Tiếng Trung",
      tags: ["TOCFL", "tiếng Trung", "chứng chỉ"],
      coverImage: "/images/hero-banner.png",
      publishedAt: "2025-03-20",
      readTime: "7 phút",
      featured: false,
    },
    {
      id: "5",
      title: "Chi phí sinh hoạt tại Đài Loan – Bao nhiêu là đủ?",
      slug: "chi-phi-sinh-hoat-tai-dai-loan",
      excerpt:
        "Phân tích chi tiết chi phí ăn ở, đi lại, sinh hoạt hàng tháng tại Đài Bắc, Đài Trung và Cao Hùng cho du học sinh Việt Nam.",
      category: "Kinh nghiệm",
      tags: ["chi phí", "sinh hoạt", "đài bắc"],
      coverImage: "/images/hero-banner.png",
      publishedAt: "2025-04-01",
      readTime: "6 phút",
      featured: true,
    },
    {
      id: "6",
      title: "Học bổng Chính phủ Đài Loan MOE 2025 – Hướng dẫn nộp hồ sơ",
      slug: "hoc-bong-chinh-phu-dai-loan-moe",
      excerpt:
        "Thông tin đầy đủ về học bổng MOE dành cho sinh viên quốc tế, điều kiện xét duyệt và cách viết hồ sơ xin học bổng nổi bật.",
      category: "Học bổng",
      tags: ["học bổng", "MOE", "chính phủ"],
      coverImage: "/images/university-campus.png",
      publishedAt: "2025-04-15",
      readTime: "9 phút",
      featured: true,
    },
  ];
  return category ? all.filter((p) => p.category === category) : all;
}

export function getMockSchools(region?: string): School[] {
  const all: School[] = [
    {
      id: "s1",
      name: "Đại học Quốc gia Đài Loan (NTU)",
      region: "Miền Bắc",
      city: "Đài Bắc",
      type: "Công lập",
      ranking: 1,
      tuitionMin: 1800,
      tuitionMax: 3000,
      scholarships: true,
      website: "https://www.ntu.edu.tw",
      logo: "",
      description: "Trường đại học hàng đầu Đài Loan, top 100 châu Á.",
    },
    {
      id: "s2",
      name: "Đại học Thanh Hoa (NTHU)",
      region: "Miền Bắc",
      city: "Tân Trúc",
      type: "Công lập",
      ranking: 2,
      tuitionMin: 1700,
      tuitionMax: 2800,
      scholarships: true,
      website: "https://www.nthu.edu.tw",
      logo: "",
      description: "Nổi tiếng về khoa học kỹ thuật và công nghệ.",
    },
    {
      id: "s3",
      name: "Đại học Thành Công (NCKU)",
      region: "Miền Nam",
      city: "Đài Nam",
      type: "Công lập",
      ranking: 3,
      tuitionMin: 1600,
      tuitionMax: 2700,
      scholarships: true,
      website: "https://www.ncku.edu.tw",
      logo: "",
      description: "Top đầu về kỹ thuật và y khoa tại miền Nam.",
    },
    {
      id: "s4",
      name: "Đại học Long Hoa",
      region: "Miền Bắc",
      city: "Đào Viên",
      type: "Tư thục",
      ranking: 15,
      tuitionMin: 2200,
      tuitionMax: 3500,
      scholarships: true,
      website: "https://www.lhu.edu.tw",
      logo: "",
      description: "Phổ biến với hệ vừa học vừa làm cho sinh viên Việt Nam.",
    },
    {
      id: "s5",
      name: "Đại học Đài Trung",
      region: "Miền Trung",
      city: "Đài Trung",
      type: "Công lập",
      ranking: 8,
      tuitionMin: 1500,
      tuitionMax: 2600,
      scholarships: true,
      website: "https://www.nchu.edu.tw",
      logo: "",
      description: "Trường lớn tại miền Trung, nhiều ngành đào tạo đa dạng.",
    },
    {
      id: "s6",
      name: "Đại học Cao Hùng (NSYSU)",
      region: "Miền Nam",
      city: "Cao Hùng",
      type: "Công lập",
      ranking: 6,
      tuitionMin: 1600,
      tuitionMax: 2500,
      scholarships: true,
      website: "https://www.nsysu.edu.tw",
      logo: "",
      description: "Nằm ở thành phố cảng lớn nhất Đài Loan.",
    },
  ];
  return region ? all.filter((s) => s.region === region) : all;
}

export function getMockScholarships(): Scholarship[] {
  return [
    {
      id: "sc1",
      title: "Học bổng Chính phủ Đài Loan (Taiwan Scholarship)",
      provider: "Bộ Giáo dục Đài Loan (MOE)",
      type: "full",
      amount: "40.000 TWD/tháng + miễn học phí",
      deadline: "2025-03-31",
      requirements: [
        "GPA ≥ 80/100",
        "Không quá 35 tuổi",
        "Chưa từng học tại Đài Loan",
      ],
      link: "https://taiwanscholarship.moe.gov.tw",
    },
    {
      id: "sc2",
      title: "Học bổng ICDF",
      provider: "Quỹ Hợp tác Phát triển Quốc tế",
      type: "full",
      amount: "Toàn phần bao gồm học phí + sinh hoạt phí",
      deadline: "2025-02-28",
      requirements: ["Bằng đại học", "Kinh nghiệm làm việc 2 năm", "IELTS 6.0"],
      link: "https://icdf.org.tw",
    },
    {
      id: "sc3",
      title: "Học bổng Tiếng Hoa HES",
      provider: "Bộ Ngoại giao Đài Loan (MOFA)",
      type: "language",
      amount: "25.000 TWD/tháng",
      deadline: "2025-04-30",
      requirements: ["Tốt nghiệp THPT", "Chưa biết tiếng Trung"],
      link: "https://mofa.gov.tw",
    },
    {
      id: "sc4",
      title: "Học bổng trường NTU",
      provider: "Đại học Quốc gia Đài Loan",
      type: "partial",
      amount: "Miễn 50-100% học phí",
      deadline: "2025-05-15",
      requirements: ["GPA ≥ 85/100", "TOCFL Band B hoặc IELTS 6.5"],
      link: "https://ntu.edu.tw",
    },
  ];
}
