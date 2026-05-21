// Script tự động tạo 3 Notion databases cho DuHocToday
const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_API_KEY || "YOUR_NOTION_API_KEY" });
const PARENT_PAGE_ID = "36559ee3e32f804eb71ad5bf5bf0b842";

// ── Helpers ─────────────────────────────────────────────────────
const title = () => ({ title: {} });
const richText = () => ({ rich_text: {} });
const select = (options) => ({ select: { options: options.map((n) => ({ name: n })) } });
const multiSelect = (options) => ({ multi_select: { options: options.map((n) => ({ name: n })) } });
const number = () => ({ number: { format: "number" } });
const checkbox = () => ({ checkbox: {} });
const url = () => ({ url: {} });
const date = () => ({ date: {} });

// ── Database schemas ─────────────────────────────────────────────

const POSTS_SCHEMA = {
  Slug:        richText(),
  Excerpt:     richText(),
  Category:    select(["Kinh nghiệm", "Học bổng", "Trường học", "Tiếng Trung", "Hồ sơ", "Life in Taiwan", "Tin tức"]),
  Tags:        multiSelect(["du học", "đài loan", "học bổng", "TOCFL", "visa", "hồ sơ", "chi phí", "trường học"]),
  CoverImage:  url(),
  PublishedAt: date(),
  ReadTime:    richText(),
  Featured:    checkbox(),
  Status:      select(["Draft", "Published"]),
};

const SCHOOLS_SCHEMA = {
  Region:      select(["Miền Bắc", "Miền Trung", "Miền Nam", "Miền Đông"]),
  City:        richText(),
  Type:        select(["Công lập", "Tư thục"]),
  Ranking:     number(),
  TuitionMin:  number(),
  TuitionMax:  number(),
  Scholarships: checkbox(),
  Website:     url(),
  Logo:        url(),
  Description: richText(),
};

const SCHOLARSHIPS_SCHEMA = {
  Provider:     richText(),
  Type:         select(["full", "partial", "language"]),
  Amount:       richText(),
  Deadline:     date(),
  Requirements: multiSelect(["GPA cao", "IELTS", "TOCFL", "Kinh nghiệm làm việc", "Tốt nghiệp THPT", "Bằng đại học"]),
  Link:         url(),
};

// ── Create database ──────────────────────────────────────────────

async function createDatabase(title_text, schema, emoji) {
  console.log(`\n📦 Đang tạo database: ${title_text}...`);
  try {
    const response = await notion.databases.create({
      parent: { type: "page_id", page_id: PARENT_PAGE_ID },
      icon: { type: "emoji", emoji },
      title: [{ type: "text", text: { content: title_text } }],
      properties: {
        Title: { title: {} },
        ...schema,
      },
    });
    console.log(`✅ Tạo thành công! ID: ${response.id}`);
    return response.id;
  } catch (err) {
    console.error(`❌ Lỗi:`, err.message);
    return null;
  }
}

// ── Add sample data ──────────────────────────────────────────────

async function addSamplePost(dbId) {
  try {
    await notion.pages.create({
      parent: { database_id: dbId },
      icon: { type: "emoji", emoji: "📝" },
      properties: {
        Title:       { title: [{ text: { content: "Tại sao nên chọn du học Đài Loan năm 2025?" } }] },
        Slug:        { rich_text: [{ text: { content: "tai-sao-nen-chon-du-hoc-dai-loan" } }] },
        Excerpt:     { rich_text: [{ text: { content: "Đài Loan nổi bật với chi phí hợp lý, nhiều học bổng hấp dẫn và môi trường giáo dục chất lượng cao." } }] },
        Category:    { select: { name: "Kinh nghiệm" } },
        Tags:        { multi_select: [{ name: "du học" }, { name: "đài loan" }, { name: "học bổng" }] },
        PublishedAt: { date: { start: "2025-01-15" } },
        ReadTime:    { rich_text: [{ text: { content: "5 phút" } }] },
        Featured:    { checkbox: true },
        Status:      { select: { name: "Published" } },
      },
    });
    console.log("  📝 Đã thêm bài viết mẫu");
  } catch (e) { console.log("  ⚠️ Không thêm được bài mẫu:", e.message); }
}

async function addSampleSchool(dbId) {
  try {
    await notion.pages.create({
      parent: { database_id: dbId },
      icon: { type: "emoji", emoji: "🏫" },
      properties: {
        Title:        { title: [{ text: { content: "Đại học Quốc gia Đài Loan (NTU)" } }] },
        Region:       { select: { name: "Miền Bắc" } },
        City:         { rich_text: [{ text: { content: "Đài Bắc" } }] },
        Type:         { select: { name: "Công lập" } },
        Ranking:      { number: 1 },
        TuitionMin:   { number: 1800 },
        TuitionMax:   { number: 3000 },
        Scholarships: { checkbox: true },
        Website:      { url: "https://www.ntu.edu.tw" },
        Description:  { rich_text: [{ text: { content: "Trường đại học hàng đầu Đài Loan, top 100 châu Á." } }] },
      },
    });
    console.log("  🏫 Đã thêm trường mẫu");
  } catch (e) { console.log("  ⚠️ Không thêm được trường mẫu:", e.message); }
}

async function addSampleScholarship(dbId) {
  try {
    await notion.pages.create({
      parent: { database_id: dbId },
      icon: { type: "emoji", emoji: "🎓" },
      properties: {
        Title:        { title: [{ text: { content: "Học bổng Chính phủ Đài Loan (Taiwan Scholarship)" } }] },
        Provider:     { rich_text: [{ text: { content: "Bộ Giáo dục Đài Loan (MOE)" } }] },
        Type:         { select: { name: "full" } },
        Amount:       { rich_text: [{ text: { content: "40.000 TWD/tháng + miễn học phí" } }] },
        Deadline:     { date: { start: "2025-03-31" } },
        Requirements: { multi_select: [{ name: "GPA cao" }, { name: "IELTS" }] },
        Link:         { url: "https://taiwanscholarship.moe.gov.tw" },
      },
    });
    console.log("  🎓 Đã thêm học bổng mẫu");
  } catch (e) { console.log("  ⚠️ Không thêm được học bổng mẫu:", e.message); }
}

// ── Update .env.local ────────────────────────────────────────────

function updateEnvFile(postsId, schoolsId, scholarshipsId) {
  const envPath = path.join(__dirname, "..", ".env.local");
  let content = fs.readFileSync(envPath, "utf8");

  if (postsId)        content = content.replace("your_posts_database_id_here", postsId);
  if (schoolsId)      content = content.replace("your_schools_database_id_here", schoolsId);
  if (scholarshipsId) content = content.replace("your_scholarships_database_id_here", scholarshipsId);

  fs.writeFileSync(envPath, content);
  console.log("\n✅ Đã cập nhật .env.local!");
}

// ── Main ─────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 DuHocToday – Notion Database Setup\n");
  console.log("=".repeat(50));

  const postsId        = await createDatabase("DuHocToday – Bài viết (Posts)", POSTS_SCHEMA, "📝");
  const schoolsId      = await createDatabase("DuHocToday – Trường học (Schools)", SCHOOLS_SCHEMA, "🏫");
  const scholarshipsId = await createDatabase("DuHocToday – Học bổng (Scholarships)", SCHOLARSHIPS_SCHEMA, "🎓");

  console.log("\n" + "=".repeat(50));
  console.log("📊 Kết quả:");
  console.log(`  Posts DB ID:        ${postsId || "FAILED"}`);
  console.log(`  Schools DB ID:      ${schoolsId || "FAILED"}`);
  console.log(`  Scholarships DB ID: ${scholarshipsId || "FAILED"}`);

  if (postsId || schoolsId || scholarshipsId) {
    updateEnvFile(postsId, schoolsId, scholarshipsId);

    // Add sample data
    console.log("\n📥 Thêm dữ liệu mẫu...");
    if (postsId)        await addSamplePost(postsId);
    if (schoolsId)      await addSampleSchool(schoolsId);
    if (scholarshipsId) await addSampleScholarship(scholarshipsId);

    console.log("\n🎉 HOÀN TẤT! Restart server: npm run dev");
  } else {
    console.log("\n❌ Không tạo được database. Vui lòng tạo thủ công theo hướng dẫn.");
  }
}

main().catch(console.error);
