// Script thêm properties vào databases đã tạo và seed dữ liệu mẫu
const https = require("https");

const API_KEY = "process.env.NOTION_API_KEY || "YOUR_NOTION_API_KEY"";
const DB_IDS = {
  posts:        "e46283b7-dacd-402f-a6c7-1b9282301525",
  schools:      "a3d7d6f7-6ce4-4292-abca-04ab0d3fafa6",
  scholarships: "58642708-ac92-4d1b-83b0-edf52bbf0118",
};

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: "api.notion.com",
      path,
      method,
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
      },
    }, (res) => {
      let raw = "";
      res.on("data", (c) => raw += c);
      res.on("end", () => {
        try { resolve(JSON.parse(raw)); }
        catch { resolve(raw); }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

const POSTS_PROPS = {
  "Slug":        { rich_text: {} },
  "Excerpt":     { rich_text: {} },
  "Category":    { select: { options: ["Kinh nghiệm","Học bổng","Trường học","Tiếng Trung","Hồ sơ","Life in Taiwan","Tin tức"].map(n=>({name:n})) } },
  "Tags":        { multi_select: { options: ["du học","đài loan","học bổng","TOCFL","visa","hồ sơ","chi phí"].map(n=>({name:n})) } },
  "CoverImage":  { url: {} },
  "PublishedAt": { date: {} },
  "ReadTime":    { rich_text: {} },
  "Featured":    { checkbox: {} },
  "Status":      { select: { options: [{name:"Draft"},{name:"Published"}] } },
};

const SCHOOLS_PROPS = {
  "Region":       { select: { options: ["Miền Bắc","Miền Trung","Miền Nam","Miền Đông"].map(n=>({name:n})) } },
  "City":         { rich_text: {} },
  "Type":         { select: { options: [{name:"Công lập"},{name:"Tư thục"}] } },
  "Ranking":      { number: { format: "number" } },
  "TuitionMin":   { number: { format: "number" } },
  "TuitionMax":   { number: { format: "number" } },
  "Scholarships": { checkbox: {} },
  "Website":      { url: {} },
  "Logo":         { url: {} },
  "Description":  { rich_text: {} },
};

const SCHOLARSHIPS_PROPS = {
  "Provider":     { rich_text: {} },
  "Type":         { select: { options: [{name:"full"},{name:"partial"},{name:"language"}] } },
  "Amount":       { rich_text: {} },
  "Deadline":     { date: {} },
  "Requirements": { multi_select: { options: ["GPA cao","IELTS","TOCFL","Kinh nghiệm làm việc","Tốt nghiệp THPT","Bằng đại học"].map(n=>({name:n})) } },
  "Link":         { url: {} },
};

async function addProperties(dbId, props) {
  const res = await request("PATCH", `/v1/databases/${dbId}`, { properties: props });
  if (res.object === "error") throw new Error(res.message);
  return res;
}

async function addPage(dbId, props) {
  const res = await request("POST", "/v1/pages", { parent: { database_id: dbId }, properties: props });
  if (res.object === "error") throw new Error(res.message);
  return res;
}

async function main() {
  console.log("🔧 Thêm properties vào databases...\n");

  // Add properties
  try {
    await addProperties(DB_IDS.posts, POSTS_PROPS);
    console.log("✅ Posts database – properties added");
  } catch(e) { console.log("⚠️  Posts:", e.message); }

  try {
    await addProperties(DB_IDS.schools, SCHOOLS_PROPS);
    console.log("✅ Schools database – properties added");
  } catch(e) { console.log("⚠️  Schools:", e.message); }

  try {
    await addProperties(DB_IDS.scholarships, SCHOLARSHIPS_PROPS);
    console.log("✅ Scholarships database – properties added");
  } catch(e) { console.log("⚠️  Scholarships:", e.message); }

  console.log("\n📥 Seed dữ liệu mẫu...");

  // Seed Posts
  const samplePosts = [
    { title:"Tại sao nên chọn du học Đài Loan năm 2025?", slug:"tai-sao-nen-chon-du-hoc-dai-loan", cat:"Kinh nghiệm", featured:true, read:"5 phút", date:"2025-01-15" },
    { title:"Điều kiện và hồ sơ du học Đài Loan cần chuẩn bị", slug:"dieu-kien-ho-so-du-hoc-dai-loan", cat:"Hồ sơ", featured:true, read:"8 phút", date:"2025-02-10" },
    { title:"Top 10 trường đại học tốt nhất Đài Loan 2025", slug:"top-truong-dai-hoc-dai-loan", cat:"Trường học", featured:false, read:"10 phút", date:"2025-03-05" },
    { title:"Kinh nghiệm thi TOCFL – Chứng chỉ tiếng Trung", slug:"kinh-nghiem-thi-tocfl", cat:"Tiếng Trung", featured:false, read:"7 phút", date:"2025-03-20" },
    { title:"Chi phí sinh hoạt tại Đài Loan – Bao nhiêu là đủ?", slug:"chi-phi-sinh-hoat-tai-dai-loan", cat:"Kinh nghiệm", featured:true, read:"6 phút", date:"2025-04-01" },
    { title:"Học bổng Chính phủ Đài Loan MOE 2025", slug:"hoc-bong-chinh-phu-dai-loan-moe", cat:"Học bổng", featured:true, read:"9 phút", date:"2025-04-15" },
  ];
  for (const p of samplePosts) {
    try {
      await addPage(DB_IDS.posts, {
        "Name":        { title: [{ text: { content: p.title } }] },
        "Slug":        { rich_text: [{ text: { content: p.slug } }] },
        "Category":    { select: { name: p.cat } },
        "Featured":    { checkbox: p.featured },
        "ReadTime":    { rich_text: [{ text: { content: p.read } }] },
        "PublishedAt": { date: { start: p.date } },
        "Status":      { select: { name: "Published" } },
      });
      console.log(`  📝 ${p.title}`);
    } catch(e) { console.log(`  ⚠️  ${p.title}: ${e.message}`); }
  }

  // Seed Schools
  const sampleSchools = [
    { name:"Đại học Quốc gia Đài Loan (NTU)", region:"Miền Bắc", city:"Đài Bắc", type:"Công lập", rank:1, min:1800, max:3000 },
    { name:"Đại học Thanh Hoa (NTHU)", region:"Miền Bắc", city:"Tân Trúc", type:"Công lập", rank:2, min:1700, max:2800 },
    { name:"Đại học Thành Công (NCKU)", region:"Miền Nam", city:"Đài Nam", type:"Công lập", rank:3, min:1600, max:2700 },
    { name:"Đại học Long Hoa", region:"Miền Bắc", city:"Đào Viên", type:"Tư thục", rank:15, min:2200, max:3500 },
    { name:"Đại học Đài Trung (NCHU)", region:"Miền Trung", city:"Đài Trung", type:"Công lập", rank:8, min:1500, max:2600 },
    { name:"Đại học Cao Hùng (NSYSU)", region:"Miền Nam", city:"Cao Hùng", type:"Công lập", rank:6, min:1600, max:2500 },
  ];
  for (const s of sampleSchools) {
    try {
      await addPage(DB_IDS.schools, {
        "Name":       { title: [{ text: { content: s.name } }] },
        "Region":     { select: { name: s.region } },
        "City":       { rich_text: [{ text: { content: s.city } }] },
        "Type":       { select: { name: s.type } },
        "Ranking":    { number: s.rank },
        "TuitionMin": { number: s.min },
        "TuitionMax": { number: s.max },
        "Scholarships": { checkbox: true },
        "Website":    { url: "https://www.ntu.edu.tw" },
      });
      console.log(`  🏫 ${s.name}`);
    } catch(e) { console.log(`  ⚠️  ${s.name}: ${e.message}`); }
  }

  // Seed Scholarships
  const sampleSc = [
    { title:"Học bổng Chính phủ Đài Loan (Taiwan Scholarship)", provider:"MOE", type:"full", amount:"40.000 TWD/tháng + miễn học phí", deadline:"2025-03-31", link:"https://taiwanscholarship.moe.gov.tw" },
    { title:"Học bổng ICDF", provider:"ICDF", type:"full", amount:"Toàn phần – học phí + sinh hoạt phí", deadline:"2025-02-28", link:"https://icdf.org.tw" },
    { title:"Học bổng Tiếng Hoa HES", provider:"MOFA", type:"language", amount:"25.000 TWD/tháng", deadline:"2025-04-30", link:"https://mofa.gov.tw" },
    { title:"Học bổng NTU", provider:"NTU", type:"partial", amount:"Miễn 50-100% học phí", deadline:"2025-05-15", link:"https://ntu.edu.tw" },
  ];
  for (const sc of sampleSc) {
    try {
      await addPage(DB_IDS.scholarships, {
        "Name":     { title: [{ text: { content: sc.title } }] },
        "Provider": { rich_text: [{ text: { content: sc.provider } }] },
        "Type":     { select: { name: sc.type } },
        "Amount":   { rich_text: [{ text: { content: sc.amount } }] },
        "Deadline": { date: { start: sc.deadline } },
        "Link":     { url: sc.link },
      });
      console.log(`  🎓 ${sc.title}`);
    } catch(e) { console.log(`  ⚠️  ${sc.title}: ${e.message}`); }
  }

  console.log("\n🎉 HOÀN TẤT! Mở Notion để xem dữ liệu.");
  console.log("👉 Restart server: npm run dev");
}

main().catch(console.error);
