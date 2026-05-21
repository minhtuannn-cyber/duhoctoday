// ─── Static Content Data ────────────────────────────────────────────────────
// Nội dung tĩnh cho các trang informational (hệ học, kinh nghiệm, tiếng Trung)
// Sẽ migrate sang Notion CMS khi scale

export interface ContentSection {
  title: string;
  content: string;
  icon?: string;
}

export interface ContentPage {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  badge?: string;
  sections: ContentSection[];
  faqs?: { q: string; a: string }[];
  ctaText?: string;
  ctaLink?: string;
}

// ── Hệ đào tạo ─────────────────────────────────────────────────────────────

export const studyPrograms: ContentPage[] = [
  {
    slug: "ngon-ngu",
    title: "Hệ Ngôn ngữ",
    subtitle: "Học tiếng Trung tại trung tâm ngôn ngữ các trường đại học Đài Loan – linh hoạt, phù hợp mọi trình độ.",
    heroImage: "/images/university-campus.png",
    badge: "Linh hoạt",
    sections: [
      {
        title: "Tổng quan",
        icon: "📋",
        content: "Hệ ngôn ngữ cho phép bạn đăng ký học tiếng Trung tại trung tâm ngôn ngữ (華語中心) của các trường đại học Đài Loan. Mỗi khóa kéo dài 3 tháng (1 quý), bạn có thể gia hạn liên tục. Đây là con đường phổ biến cho những ai muốn xây nền tảng tiếng Trung trước khi vào đại học chính quy.",
      },
      {
        title: "Điều kiện nhập học",
        icon: "✅",
        content: "• Tốt nghiệp THPT trở lên\n• Không yêu cầu chứng chỉ ngoại ngữ\n• Hộ chiếu còn hạn\n• Đủ chứng minh tài chính (khoảng 2.500 USD/quý)\n• Tuổi từ 18 trở lên",
      },
      {
        title: "Chi phí",
        icon: "💰",
        content: "• Học phí: 25.000 – 35.000 TWD/quý (~20 – 28 triệu VNĐ)\n• Ký túc xá: 5.000 – 15.000 TWD/tháng\n• Sinh hoạt phí: khoảng 8.000 – 12.000 TWD/tháng\n• Bảo hiểm: ~500 TWD/tháng",
      },
      {
        title: "Thời gian và lịch học",
        icon: "🗓️",
        content: "• 4 quý/năm: Xuân (3–5), Hạ (6–8), Thu (9–11), Đông (12–2)\n• Học 15–20 giờ/tuần\n• Lớp nhỏ 8–15 người\n• Có thể chọn học buổi sáng hoặc buổi chiều",
      },
      {
        title: "Ưu điểm",
        icon: "⭐",
        content: "• Nhập học dễ, không yêu cầu chứng chỉ\n• Linh hoạt thời gian, có thể đăng ký bất cứ quý nào\n• Môi trường đa quốc gia\n• Cơ hội xin học bổng HES tiếng Hoa\n• Là bước đệm tốt để vào đại học chính quy",
      },
    ],
    faqs: [
      { q: "Học xong hệ ngôn ngữ có bằng không?", a: "Không có bằng đại học, nhưng bạn sẽ nhận chứng chỉ hoàn thành khóa học từ trường và có thể thi TOCFL để lấy chứng chỉ năng lực tiếng Trung." },
      { q: "Có thể vừa học vừa làm không?", a: "Sinh viên hệ ngôn ngữ KHÔNG được phép làm thêm theo quy định. Chỉ sinh viên đại học chính quy mới được làm thêm." },
      { q: "Có học bổng cho hệ ngôn ngữ không?", a: "Có! Học bổng HES (Huayu Enrichment Scholarship) từ Bộ Ngoại giao Đài Loan, trị giá 25.000 TWD/tháng." },
    ],
    ctaText: "Đăng ký tư vấn hệ ngôn ngữ",
    ctaLink: "/tu-van",
  },
  {
    slug: "tu-tuc",
    title: "Hệ Tự túc (Chính quy)",
    subtitle: "Học cùng sinh viên Đài Loan tại các trường đại học, cao đẳng – nhận bằng chính quy quốc tế.",
    heroImage: "/images/university-campus.png",
    badge: "Phổ biến",
    sections: [
      {
        title: "Tổng quan",
        icon: "📋",
        content: "Hệ tự túc (自費生) là hệ chính quy, sinh viên quốc tế đăng ký trực tiếp vào chương trình đại học/thạc sĩ/tiến sĩ và học cùng sinh viên bản xứ. Bạn nhận bằng chính thức được công nhận quốc tế.",
      },
      {
        title: "Điều kiện nhập học",
        icon: "✅",
        content: "• Tốt nghiệp THPT (đại học) hoặc cử nhân (thạc sĩ)\n• Chứng chỉ tiếng: TOCFL Band B hoặc tương đương / IELTS 5.5+ (chương trình tiếng Anh)\n• Bảng điểm THPT/đại học\n• Thư giới thiệu (1–2 lá)\n• Kế hoạch học tập",
      },
      {
        title: "Chi phí",
        icon: "💰",
        content: "• Học phí trường công: 1.500 – 3.000 USD/năm\n• Học phí trường tư: 2.000 – 4.500 USD/năm\n• Ký túc xá: 3.000 – 8.000 TWD/tháng\n• Sinh hoạt: 8.000 – 15.000 TWD/tháng",
      },
      {
        title: "Quy trình đăng ký",
        icon: "📝",
        content: "1. Chọn trường và ngành qua hệ thống tuyển sinh\n2. Chuẩn bị hồ sơ (bảng điểm, chứng chỉ, thư giới thiệu)\n3. Nộp hồ sơ online (tháng 2–4 cho kỳ Thu)\n4. Chờ kết quả xét duyệt (1–2 tháng)\n5. Nhận thư nhập học và xin visa\n6. Bay sang Đài Loan và nhập học",
      },
      {
        title: "Ưu điểm",
        icon: "⭐",
        content: "• Bằng cấp quốc tế chính quy\n• Được phép làm thêm 20h/tuần\n• Nhiều cơ hội học bổng từ trường\n• Môi trường học thuật chất lượng cao\n• Nhiều ngành học bằng tiếng Anh",
      },
    ],
    faqs: [
      { q: "Có bắt buộc biết tiếng Trung không?", a: "Không bắt buộc nếu chọn chương trình giảng dạy bằng tiếng Anh. Tuy nhiên, biết tiếng Trung sẽ giúp bạn hòa nhập tốt hơn." },
      { q: "Thời gian học bao lâu?", a: "Đại học: 4 năm. Thạc sĩ: 1.5–2 năm. Tiến sĩ: 3–7 năm." },
    ],
    ctaText: "Đăng ký tư vấn hệ tự túc",
    ctaLink: "/tu-van",
  },
  {
    slug: "du-bi",
    title: "Hệ Dự bị 1+4",
    subtitle: "1 năm dự bị + 4 năm đại học – Không cần chứng chỉ ngoại ngữ, phù hợp cho người mới bắt đầu.",
    heroImage: "/images/university-campus.png",
    badge: "Dễ nhập học",
    sections: [
      {
        title: "Tổng quan",
        icon: "📋",
        content: "Hệ dự bị 1+4 (僑生先修部) dành cho sinh viên nước ngoài gốc Hoa hoặc sinh viên quốc tế. Bạn học 1 năm tại Trung tâm Dự bị Đại học Quốc lập (NUPS), sau đó được xếp vào trường đại học chính quy dựa theo điểm số.",
      },
      {
        title: "Điều kiện",
        icon: "✅",
        content: "• Tốt nghiệp THPT\n• Không yêu cầu chứng chỉ ngoại ngữ\n• Hộ chiếu còn hạn\n• Chứng minh tài chính\n• Đăng ký qua hệ thống NUPS",
      },
      {
        title: "Chi phí",
        icon: "💰",
        content: "• Năm dự bị: khoảng 35.000 TWD/năm\n• Đại học: tùy trường (1.500 – 3.000 USD/năm)\n• Ký túc xá năm dự bị: ưu tiên, giá rẻ\n• Sinh hoạt: 8.000 – 12.000 TWD/tháng",
      },
      {
        title: "Chương trình dự bị",
        icon: "📚",
        content: "Năm dự bị tập trung:\n• Tiếng Trung (集中學習)\n• Toán, Lý, Hóa, Sinh (tùy ngành)\n• Kỹ năng học thuật\n• Hoạt động ngoại khóa\n\nSau 1 năm, xếp trường dựa theo điểm và nguyện vọng.",
      },
      {
        title: "Ưu điểm",
        icon: "⭐",
        content: "• Không cần chứng chỉ ngoại ngữ đầu vào\n• Có thời gian thích nghi văn hóa\n• Được hỗ trợ toàn diện năm đầu\n• Chi phí năm dự bị thấp\n• Cơ hội vào trường tốt nếu học giỏi",
      },
    ],
    faqs: [
      { q: "Ai đủ điều kiện dự bị 1+4?", a: "Chương trình mở cho cả Hoa kiều và sinh viên quốc tế. Điều kiện cụ thể tùy từng năm." },
      { q: "Sau 1 năm có được chọn trường không?", a: "Có, bạn được xếp theo điểm và nguyện vọng. Học giỏi = được vào trường top." },
    ],
    ctaText: "Đăng ký tư vấn hệ dự bị",
    ctaLink: "/tu-van",
  },
  {
    slug: "vhvl",
    title: "Hệ Vừa học vừa làm",
    subtitle: "Kết hợp học lý thuyết và thực tập tại doanh nghiệp — thu nhập ổn định trong quá trình học.",
    heroImage: "/images/hero-banner.png",
    badge: "Hot 🔥",
    sections: [
      {
        title: "Tổng quan",
        icon: "📋",
        content: "Hệ vừa học vừa làm (產學攜手合作) là chương trình hợp tác giữa trường đại học và doanh nghiệp Đài Loan. Sinh viên vừa học tại trường, vừa thực tập và làm việc tại công ty đối tác, nhận lương hàng tháng.",
      },
      {
        title: "Điều kiện",
        icon: "✅",
        content: "• Tốt nghiệp THPT\n• Sức khỏe tốt (yêu cầu khám sức khỏe)\n• Không yêu cầu chứng chỉ ngoại ngữ cao\n• Hộ chiếu còn hạn\n• Cam kết làm việc tại doanh nghiệp đối tác",
      },
      {
        title: "Thu nhập & Chi phí",
        icon: "💰",
        content: "• Lương thực tập: 27.470 TWD/tháng trở lên (lương cơ bản)\n• Học phí: do doanh nghiệp hỗ trợ 1 phần hoặc toàn bộ\n• Ký túc xá: thường do doanh nghiệp sắp xếp\n• Thu nhập đủ trang trải sinh hoạt tại Đài Loan",
      },
      {
        title: "Lịch trình",
        icon: "🗓️",
        content: "• Mô hình: Học 2 ngày + Làm 4 ngày / hoặc Học nửa ngày + Làm nửa ngày\n• Thời gian: 4 năm đại học + tùy chọn thạc sĩ\n• Có thể gia hạn làm việc sau tốt nghiệp",
      },
      {
        title: "Ưu điểm",
        icon: "⭐",
        content: "• Thu nhập ngay từ năm nhất\n• Kinh nghiệm thực tế từ doanh nghiệp\n• Chi phí gần như tự trang trải\n• Cơ hội ở lại làm việc sau tốt nghiệp\n• Bằng đại học chính quy",
      },
    ],
    faqs: [
      { q: "Làm ở đâu?", a: "Các nhà máy, công ty sản xuất, khách sạn, nhà hàng... tùy ngành học. Phổ biến nhất là ngành kỹ thuật, du lịch, nhà hàng khách sạn." },
      { q: "Có được đổi công ty không?", a: "Về nguyên tắc, sinh viên gắn bó với công ty đối tác trong suốt khóa học. Trường hợp đặc biệt có thể xin chuyển." },
    ],
    ctaText: "Đăng ký tư vấn hệ VHVL",
    ctaLink: "/tu-van",
  },
  {
    slug: "hoa-kieu",
    title: "Hệ Hoa Kiều",
    subtitle: "Chương trình đặc biệt dành cho người gốc Hoa — nhiều ưu đãi về học phí và xét tuyển.",
    heroImage: "/images/hero-banner.png",
    badge: "Ưu đãi cao",
    sections: [
      {
        title: "Tổng quan",
        icon: "📋",
        content: "Hệ Hoa Kiều (僑生) dành cho người gốc Hoa ở nước ngoài. Chương trình có nhiều ưu đãi đặc biệt: ưu tiên xét tuyển, giảm học phí, nhiều học bổng, và hỗ trợ chỗ ở.",
      },
      {
        title: "Điều kiện",
        icon: "✅",
        content: "• Có gốc Hoa (cha/mẹ/ông bà gốc Trung Quốc, Đài Loan)\n• Cư trú ngoài Đài Loan liên tục 6 năm trở lên\n• Tốt nghiệp THPT\n• Đăng ký qua hệ thống OCAC",
      },
      {
        title: "Ưu đãi",
        icon: "🎁",
        content: "• Giảm học phí 10-100% tùy trường\n• Ưu tiên xét tuyển vào trường top\n• Nhiều học bổng dành riêng cho Hoa Kiều\n• Hỗ trợ ký túc xá ưu tiên\n• Miễn/giảm thuế làm thêm",
      },
      {
        title: "Quy trình",
        icon: "📝",
        content: "1. Đăng ký tài khoản trên hệ thống OCAC\n2. Điền đơn và upload hồ sơ\n3. Chọn nguyện vọng (tối đa 70 trường)\n4. Chờ xét duyệt và phân bổ\n5. Nhận kết quả và xin visa",
      },
    ],
    faqs: [
      { q: "Làm sao chứng minh gốc Hoa?", a: "Cần giấy tờ chứng minh nguồn gốc: hộ chiếu cũ, giấy khai sinh, sổ hộ khẩu gốc... của cha/mẹ/ông bà." },
      { q: "Người Việt gốc Hoa có đủ điều kiện không?", a: "Có, nếu chứng minh được gốc Hoa và cư trú ngoài Đài Loan 6 năm liên tục." },
    ],
    ctaText: "Đăng ký tư vấn hệ Hoa Kiều",
    ctaLink: "/tu-van",
  },
  {
    slug: "intense",
    title: "Hệ INTENSE & Exchange",
    subtitle: "Chương trình hợp tác quốc tế, trao đổi sinh viên và thực tập tại doanh nghiệp công nghệ cao.",
    heroImage: "/images/hero-banner.png",
    badge: "Mới",
    sections: [
      {
        title: "INTENSE là gì?",
        icon: "📋",
        content: "INTENSE (International Elite Scholars & Experts) là chương trình của chính phủ Đài Loan thu hút nhân tài quốc tế trong các ngành STEM, bán dẫn, AI, và công nghệ cao. Sinh viên được học và thực tập tại các doanh nghiệp hàng đầu.",
      },
      {
        title: "Exchange Programs",
        icon: "🌍",
        content: "Nhiều trường đại học Đài Loan có chương trình trao đổi sinh viên với các trường ở Việt Nam. Thời gian: 1–2 học kỳ. Bạn vẫn giữ tư cách sinh viên trường gốc và được công nhận tín chỉ.",
      },
      {
        title: "Điều kiện",
        icon: "✅",
        content: "• Đang là sinh viên đại học/thạc sĩ\n• GPA tốt (≥ 3.0/4.0)\n• IELTS 6.0+ hoặc TOCFL Band B\n• Thư giới thiệu từ giảng viên\n• Kế hoạch học tập/nghiên cứu",
      },
      {
        title: "Ưu điểm",
        icon: "⭐",
        content: "• Tiếp xúc công nghệ tiên tiến\n• Mạng lưới quan hệ quốc tế\n• Cơ hội việc làm tại Đài Loan/quốc tế\n• Học bổng hấp dẫn\n• Trải nghiệm đa văn hóa",
      },
    ],
    faqs: [
      { q: "INTENSE khác gì trao đổi sinh viên?", a: "INTENSE tập trung vào ngành STEM/công nghệ cao và có thực tập doanh nghiệp. Exchange là trao đổi sinh viên chung, mọi ngành." },
    ],
    ctaText: "Tìm hiểu thêm",
    ctaLink: "/tu-van",
  },
];

// ── Kinh nghiệm du học ──────────────────────────────────────────────────────

export const experienceGuides: ContentPage[] = [
  {
    slug: "ho-so",
    title: "Chuẩn bị hồ sơ du học Đài Loan",
    subtitle: "Danh sách đầy đủ giấy tờ cần thiết và hướng dẫn chuẩn bị hồ sơ du học chính xác nhất.",
    heroImage: "/images/consultation-hero.png",
    badge: "📋 Hướng dẫn",
    sections: [
      {
        title: "Danh sách hồ sơ cần chuẩn bị",
        icon: "📄",
        content: "1. Hộ chiếu còn hạn ít nhất 6 tháng\n2. Bằng tốt nghiệp THPT/Đại học (bản gốc + bản dịch)\n3. Bảng điểm (bản gốc + bản dịch)\n4. Chứng chỉ ngoại ngữ (TOCFL/IELTS/HSK)\n5. Ảnh thẻ 4×6 (nền trắng)\n6. Giấy khám sức khỏe\n7. Chứng minh tài chính (sổ tiết kiệm)\n8. Kế hoạch học tập (Study Plan)\n9. Thư giới thiệu (1–2 lá)\n10. CV/Resume",
      },
      {
        title: "Công chứng & Hợp pháp hóa lãnh sự",
        icon: "📌",
        content: "Tất cả giấy tờ cần được:\n• Dịch thuật công chứng sang tiếng Trung hoặc tiếng Anh\n• Hợp pháp hóa lãnh sự tại Văn phòng Kinh tế Văn hóa Đài Bắc\n• Thời gian xử lý: 5–10 ngày làm việc\n• Chi phí: khoảng 500.000 – 1.000.000 VNĐ",
      },
      {
        title: "Thư giới thiệu",
        icon: "✉️",
        content: "• Nên xin từ giáo viên chủ nhiệm hoặc hiệu trưởng\n• Nội dung: đánh giá năng lực, phẩm chất, mục tiêu học tập\n• Viết bằng tiếng Anh hoặc tiếng Trung\n• Có đóng dấu trường và chữ ký",
      },
      {
        title: "Kế hoạch học tập (Study Plan)",
        icon: "📝",
        content: "Nên bao gồm:\n• Lý do chọn Đài Loan\n• Lý do chọn trường và ngành\n• Mục tiêu học tập cụ thể\n• Kế hoạch sau tốt nghiệp\n• Độ dài: 500–1000 từ",
      },
    ],
    faqs: [
      { q: "Hồ sơ nộp online hay offline?", a: "Hầu hết trường nhận hồ sơ online. Một số yêu cầu gửi bản cứng qua bưu điện sau khi nộp online." },
      { q: "Cần chuẩn bị bao lâu trước?", a: "Nên bắt đầu chuẩn bị ít nhất 3–6 tháng trước deadline." },
    ],
  },
  {
    slug: "chon-nganh",
    title: "Chọn ngành học tại Đài Loan",
    subtitle: "Mẹo chọn ngành phù hợp với thế mạnh cá nhân và cơ hội việc làm sau này.",
    heroImage: "/images/university-campus.png",
    badge: "🎯 Định hướng",
    sections: [
      {
        title: "Các ngành hot tại Đài Loan",
        icon: "🔥",
        content: "• Kỹ thuật & Công nghệ (STEM) — thiếu hụt nhân lực, dễ xin việc\n• Bán dẫn & Chip — Đài Loan chiếm >60% thị trường chip toàn cầu\n• Quản trị kinh doanh — ngành phổ biến nhất\n• Du lịch & Khách sạn — phát triển mạnh\n• Thiết kế & Truyền thông — Đài Loan nổi tiếng về sáng tạo\n• Y tế & Điều dưỡng — nhu cầu cao",
      },
      {
        title: "Cách chọn ngành phù hợp",
        icon: "💡",
        content: "1. Đánh giá sở thích và thế mạnh cá nhân\n2. Tìm hiểu cơ hội việc làm sau tốt nghiệp\n3. Xem xét học phí và học bổng theo ngành\n4. Tham khảo ranking trường theo từng ngành\n5. Cân nhắc ngôn ngữ giảng dạy (Trung/Anh)",
      },
      {
        title: "Ngành dạy bằng tiếng Anh",
        icon: "🌍",
        content: "Nhiều trường top có chương trình hoàn toàn bằng tiếng Anh:\n• NTU, NTHU, NCKU — nhiều ngành STEM\n• NCCU — Kinh tế, Quan hệ quốc tế\n• NYCU — Công nghệ thông tin, AI\n\nPhù hợp nếu chưa giỏi tiếng Trung.",
      },
    ],
  },
  {
    slug: "chi-phi",
    title: "Chi phí sinh hoạt tại Đài Loan",
    subtitle: "Phân tích chi tiết chi phí ăn ở, đi lại, sinh hoạt hàng tháng cho du học sinh Việt Nam.",
    heroImage: "/images/taiwan-life.png",
    badge: "💳 Tài chính",
    sections: [
      {
        title: "Chi phí hàng tháng tổng quan",
        icon: "📊",
        content: "• Ký túc xá: 3.000 – 8.000 TWD\n• Thuê phòng ngoài: 5.000 – 15.000 TWD\n• Ăn uống: 5.000 – 8.000 TWD\n• Đi lại: 1.000 – 2.000 TWD\n• Điện thoại: 300 – 500 TWD\n• Giải trí: 1.000 – 3.000 TWD\n\n**Tổng: 12.000 – 30.000 TWD/tháng** (~9.5 – 24 triệu VNĐ)",
      },
      {
        title: "So sánh theo thành phố",
        icon: "🏙️",
        content: "**Đài Bắc (cao nhất):** 20.000 – 30.000 TWD/tháng\n**Đài Trung:** 15.000 – 22.000 TWD/tháng\n**Cao Hùng / Đài Nam:** 12.000 – 18.000 TWD/tháng\n**Hoa Liên / Đài Đông:** 10.000 – 15.000 TWD/tháng",
      },
      {
        title: "Mẹo tiết kiệm",
        icon: "💡",
        content: "• Nấu ăn tại nhà thay vì ăn ngoài\n• Sử dụng thẻ EasyCard cho giao thông\n• Mua đồ ở chợ truyền thống\n• Tận dụng discount tại siêu thị lúc tối\n• Đăng ký gói data điện thoại sinh viên",
      },
    ],
  },
  {
    slug: "nha-o",
    title: "Tìm nhà ở tại Đài Loan",
    subtitle: "Ký túc xá hay thuê ngoài? So sánh ưu nhược điểm từng loại cho du học sinh.",
    heroImage: "/images/university-campus.png",
    badge: "🏠 Chỗ ở",
    sections: [
      {
        title: "Ký túc xá trường",
        icon: "🏫",
        content: "**Ưu điểm:**\n• Giá rẻ: 3.000 – 8.000 TWD/tháng\n• Gần trường, tiết kiệm đi lại\n• An ninh, quản lý chặt chẽ\n• Dễ kết bạn\n\n**Nhược điểm:**\n• Phòng ở chung 2–4 người\n• Ít riêng tư\n• Nhiều quy định (giờ giới nghiêm...)\n• Khó đăng ký (hết chỗ nhanh)",
      },
      {
        title: "Thuê phòng bên ngoài",
        icon: "🏠",
        content: "**Ưu điểm:**\n• Tự do, riêng tư\n• Có thể chọn vị trí, diện tích\n• Không giờ giới nghiêm\n\n**Nhược điểm:**\n• Giá cao hơn: 5.000 – 15.000 TWD/tháng\n• Tự lo điện nước, internet\n• Cần đặt cọc 1–2 tháng",
      },
      {
        title: "Tìm nhà ở đâu?",
        icon: "🔍",
        content: "• 591.com.tw — trang thuê nhà lớn nhất Đài Loan\n• Facebook groups: \"Nhà ở Đài Loan cho du học sinh\"\n• Bảng tin trường (公佈欄)\n• Nhờ anh chị khóa trên giới thiệu\n• App: HouseFun, Rakuten LIFULL",
      },
    ],
  },
  {
    slug: "lam-them",
    title: "Làm thêm hợp pháp tại Đài Loan",
    subtitle: "Sinh viên quốc tế được làm thêm tối đa 20h/tuần — tìm việc ở đâu và lưu ý gì?",
    heroImage: "/images/taiwan-life.png",
    badge: "💼 Việc làm",
    sections: [
      {
        title: "Quy định làm thêm",
        icon: "📋",
        content: "• Sinh viên đại học chính quy: được làm thêm tối đa 20h/tuần\n• Sinh viên hệ ngôn ngữ: KHÔNG được phép làm thêm\n• Cần xin giấy phép lao động tại trường\n• Nghỉ hè/nghỉ đông: được làm full-time\n• Lương tối thiểu: 27.470 TWD/tháng (2025)",
      },
      {
        title: "Các loại công việc phổ biến",
        icon: "💼",
        content: "• Phiên dịch tiếng Việt-Trung: 200–500 TWD/giờ\n• Phục vụ nhà hàng: 183–250 TWD/giờ\n• Dạy tiếng Việt: 300–500 TWD/giờ\n• Trợ lý nghiên cứu tại trường: 183–300 TWD/giờ\n• Bán hàng online\n• Gia sư",
      },
      {
        title: "Tìm việc ở đâu?",
        icon: "🔍",
        content: "• 104.com.tw — trang tuyển dụng lớn nhất\n• 1111.com.tw — trang tuyển dụng phổ biến\n• Facebook groups cộng đồng Việt tại ĐL\n• Bảng tin việc làm tại trường\n• Giới thiệu từ bạn bè, anh chị",
      },
    ],
  },
  {
    slug: "cuoc-song",
    title: "Cuộc sống tại Đài Loan",
    subtitle: "Trải nghiệm thực tế từ du học sinh Việt Nam — từ ăn uống đến giao thông, giải trí.",
    heroImage: "/images/taiwan-life.png",
    badge: "🌏 Life",
    sections: [
      {
        title: "Ẩm thực",
        icon: "🍜",
        content: "Đài Loan là thiên đường ẩm thực!\n• Chợ đêm: trà sữa trân châu, gà rán, hào chiên\n• Cơm hộp (便當): 60–100 TWD, rẻ và ngon\n• Đồ ăn Việt Nam dễ tìm ở các thành phố lớn\n• Siêu thị: PX Mart, Carrefour, Costco",
      },
      {
        title: "Giao thông",
        icon: "🚇",
        content: "• MRT (tàu điện ngầm): Đài Bắc, Cao Hùng\n• Xe buýt: phủ khắp, giá rẻ\n• YouBike (xe đạp công cộng): 5 TWD/30 phút\n• Xe máy/scooter: phổ biến, cần bằng lái\n• Thẻ EasyCard: dùng cho tất cả phương tiện",
      },
      {
        title: "Giải trí & Du lịch",
        icon: "🎭",
        content: "• Chợ đêm nổi tiếng: Shilin, Raohe, Fengjia\n• Núi & biển: Đài Loan có cảnh quan tuyệt đẹp\n• Suối nước nóng: Beitou, Jiaoxi\n• Lễ hội: Tết Nguyên đán, Lễ hội đèn lồng\n• K-Town, karaoke, cinema",
      },
    ],
  },
  {
    slug: "van-hoa",
    title: "Văn hóa & Du lịch Đài Loan",
    subtitle: "Khám phá nền văn hóa phong phú, con người thân thiện và những điểm đến hấp dẫn.",
    heroImage: "/images/taiwan-life.png",
    badge: "🎌 Văn hóa",
    sections: [
      {
        title: "Văn hóa Đài Loan",
        icon: "🏮",
        content: "• Người Đài Loan rất thân thiện và lịch sự\n• Văn hóa trà đạo và ẩm thực phong phú\n• Tôn trọng quy tắc và trật tự\n• Hệ thống y tế NHI xuất sắc\n• Tự do, cởi mở, đa dạng",
      },
      {
        title: "Điểm du lịch nổi bật",
        icon: "📍",
        content: "• Đài Bắc: Taipei 101, Cố Cung, Jiufen\n• Hoa Liên: Vách đá Taroko\n• Nhật Nguyệt Đàm (Sun Moon Lake)\n• Ali Sơn (Alishan): rừng cổ thụ\n• Kenting: bãi biển phía Nam\n• Đảo Penghu, Đảo Lục Đảo",
      },
    ],
  },
  {
    slug: "hoi-dap",
    title: "Hỏi đáp du học Đài Loan",
    subtitle: "Tổng hợp câu hỏi thường gặp về du học Đài Loan — giải đáp mọi thắc mắc.",
    heroImage: "/images/consultation-hero.png",
    badge: "❓ FAQ",
    sections: [],
    faqs: [
      { q: "Du học Đài Loan tốn bao nhiêu tiền?", a: "Tổng chi phí khoảng 3.000 – 6.000 USD/năm (học phí + sinh hoạt), rẻ hơn nhiều so với Mỹ, Úc, Nhật, Hàn." },
      { q: "Có cần biết tiếng Trung không?", a: "Tùy hệ. Hệ ngôn ngữ và dự bị không cần. Hệ tự túc cần TOCFL Band B hoặc có chương trình tiếng Anh." },
      { q: "Visa du học Đài Loan xin có khó không?", a: "Tỷ lệ đậu visa rất cao (>95%) nếu hồ sơ đầy đủ. Nộp tại Văn phòng Kinh tế Văn hóa Đài Bắc." },
      { q: "Có được làm thêm không?", a: "Sinh viên đại học chính quy: 20h/tuần. Hệ ngôn ngữ: không được." },
      { q: "Học xong có ở lại Đài Loan được không?", a: "Có! Chính sách Evaluation Point System cho phép sinh viên tốt nghiệp xin giấy phép lao động." },
      { q: "So sánh Đài Loan với Nhật, Hàn?", a: "Đài Loan rẻ hơn, ít cạnh tranh hơn, người dân thân thiện, và chính sách visa thuận lợi cho sinh viên VN." },
      { q: "Nên học ở thành phố nào?", a: "Đài Bắc: sôi động, nhiều cơ hội nhưng đắt đỏ. Đài Trung: cân bằng. Cao Hùng: rẻ, khí hậu ấm." },
      { q: "Cần chuẩn bị hồ sơ bao lâu?", a: "Ít nhất 3–6 tháng trước deadline. Một số hồ sơ như chứng minh tài chính cần thời gian tích lũy." },
    ],
  },
];

// ── Tiếng Trung ──────────────────────────────────────────────────────────────

export const chineseResources: ContentPage[] = [
  {
    slug: "tocfl",
    title: "Luyện thi TOCFL — Chứng chỉ tiếng Trung",
    subtitle: "Lộ trình ôn thi TOCFL từ Band A đến Band C — tài liệu, mẹo, và kinh nghiệm thực tế.",
    heroImage: "/images/university-campus.png",
    badge: "🗣️ TOCFL",
    sections: [
      {
        title: "TOCFL là gì?",
        icon: "📋",
        content: "TOCFL (Test of Chinese as a Foreign Language) là chứng chỉ năng lực tiếng Trung chính thức của Đài Loan. Tương đương HSK của Trung Quốc nhưng được Đài Loan và nhiều quốc gia công nhận.\n\nCác cấp độ:\n• Band A (A1, A2): Sơ cấp\n• Band B (B1, B2): Trung cấp\n• Band C (C1, C2): Cao cấp",
      },
      {
        title: "Tại sao cần TOCFL?",
        icon: "🎯",
        content: "• Điều kiện bắt buộc cho nhiều chương trình đại học\n• Yêu cầu cho học bổng chính phủ (MOE)\n• Điểm cộng khi xin việc tại Đài Loan\n• Chứng minh năng lực tiếng Trung chính thức\n• Có giá trị 2 năm",
      },
      {
        title: "Lộ trình ôn thi",
        icon: "📚",
        content: "**Band A (3–6 tháng):**\n• Học 500 từ vựng cơ bản\n• Nắm 50 cấu trúc ngữ pháp\n• Nghe đoạn hội thoại ngắn\n\n**Band B (6–12 tháng):**\n• 2.500 từ vựng\n• 200 cấu trúc ngữ pháp\n• Đọc hiểu đoạn văn\n• Nghe tin tức, bài giảng\n\n**Band C (18–24 tháng):**\n• 5.000+ từ vựng\n• Đọc bài học thuật\n• Viết luận, thảo luận",
      },
      {
        title: "Tài liệu ôn thi",
        icon: "📖",
        content: "• Sách chính thức: 華語八千詞 (8000 từ tiếng Hoa)\n• Website: tocfl.edu.tw (đề thi thử miễn phí)\n• App: Pleco, Anki (flashcards)\n• YouTube: 學中文 channels\n• Sách giáo trình: 當代中文課程 (Contemporary Chinese)",
      },
      {
        title: "Mẹo thi đạt điểm cao",
        icon: "💡",
        content: "• Làm đề thi thử nhiều lần\n• Tập trung phần nghe — chiếm 50% bài thi\n• Học từ vựng theo chủ đề\n• Đọc báo tiếng Trung mỗi ngày\n• Tìm language partner người Đài Loan",
      },
    ],
    faqs: [
      { q: "TOCFL và HSK khác nhau thế nào?", a: "TOCFL dùng chữ Phồn thể (繁體), HSK dùng Giản thể (简体). TOCFL được Đài Loan công nhận, HSK được Trung Quốc công nhận. Một số trường Đài Loan chấp nhận cả hai." },
      { q: "Thi TOCFL ở đâu tại Việt Nam?", a: "Tại Hà Nội và TP.HCM. Lịch thi: 4 lần/năm (tháng 3, 5, 9, 11). Đăng ký tại tocfl.edu.tw." },
      { q: "Phí thi bao nhiêu?", a: "Khoảng 30–50 USD tùy cấp độ và địa điểm thi." },
    ],
  },
  {
    slug: "tu-vung",
    title: "Từ vựng tiếng Trung theo chủ đề",
    subtitle: "Học từ vựng tiếng Trung theo chủ đề — phương pháp hiệu quả nhất cho du học sinh.",
    heroImage: "/images/university-campus.png",
    badge: "📝 Từ vựng",
    sections: [
      {
        title: "Chào hỏi & Giao tiếp cơ bản",
        icon: "👋",
        content: "• 你好 (nǐ hǎo) — Xin chào\n• 謝謝 (xiè xiè) — Cảm ơn\n• 對不起 (duì bù qǐ) — Xin lỗi\n• 再見 (zài jiàn) — Tạm biệt\n• 請問 (qǐng wèn) — Xin hỏi\n• 沒關係 (méi guān xì) — Không sao",
      },
      {
        title: "Trường học & Học tập",
        icon: "📚",
        content: "• 大學 (dà xué) — Đại học\n• 教室 (jiào shì) — Phòng học\n• 老師 (lǎo shī) — Giáo viên\n• 同學 (tóng xué) — Bạn học\n• 考試 (kǎo shì) — Thi cử\n• 功課 (gōng kè) — Bài tập\n• 學期 (xué qī) — Học kỳ\n• 畢業 (bì yè) — Tốt nghiệp",
      },
      {
        title: "Ăn uống",
        icon: "🍜",
        content: "• 早餐 (zǎo cān) — Bữa sáng\n• 午餐 (wǔ cān) — Bữa trưa\n• 晚餐 (wǎn cān) — Bữa tối\n• 便當 (biàn dāng) — Cơm hộp\n• 珍珠奶茶 (zhēn zhū nǎi chá) — Trà sữa trân châu\n• 好吃 (hǎo chī) — Ngon\n• 多少錢 (duō shǎo qián) — Bao nhiêu tiền?",
      },
      {
        title: "Giao thông",
        icon: "🚇",
        content: "• 捷運 (jié yùn) — MRT/Tàu điện\n• 公車 (gōng chē) — Xe buýt\n• 火車 (huǒ chē) — Tàu hỏa\n• 高鐵 (gāo tiě) — Tàu cao tốc\n• 悠遊卡 (yōu yóu kǎ) — Thẻ EasyCard",
      },
    ],
  },
  {
    slug: "ngu-phap",
    title: "Ngữ pháp tiếng Trung cơ bản",
    subtitle: "Nắm vững cấu trúc ngữ pháp tiếng Trung — nền tảng cho giao tiếp và thi TOCFL.",
    heroImage: "/images/university-campus.png",
    badge: "📐 Ngữ pháp",
    sections: [
      {
        title: "Cấu trúc câu cơ bản",
        icon: "📋",
        content: "Tiếng Trung theo trật tự SVO (Chủ - Vị - Tân):\n• 我是學生 (wǒ shì xué shēng) — Tôi là sinh viên\n• 她學中文 (tā xué zhōng wén) — Cô ấy học tiếng Trung\n• 我們去學校 (wǒ men qù xué xiào) — Chúng tôi đi đến trường",
      },
      {
        title: "Từ đếm (量詞)",
        icon: "🔢",
        content: "• 個 (gè) — cái (chung nhất)\n• 本 (běn) — quyển (sách)\n• 杯 (bēi) — ly/cốc\n• 位 (wèi) — vị (người, lịch sự)\n• 件 (jiàn) — món, vụ (quần áo, sự việc)\n• 隻 (zhī) — con (động vật nhỏ)",
      },
      {
        title: "Các mẫu câu thường dùng",
        icon: "💬",
        content: "• 是...的 (shì...de) — Nhấn mạnh\n• 因為...所以 (yīn wèi...suǒ yǐ) — Vì...nên\n• 雖然...但是 (suī rán...dàn shì) — Tuy...nhưng\n• 越來越 (yuè lái yuè) — Ngày càng\n• 不但...而且 (bù dàn...ér qiě) — Không những...mà còn",
      },
    ],
  },
  {
    slug: "tai-lieu",
    title: "Tài liệu học tiếng Trung",
    subtitle: "Tổng hợp sách, app, website và kênh YouTube tốt nhất để tự học tiếng Trung.",
    heroImage: "/images/university-campus.png",
    badge: "📖 Tài liệu",
    sections: [
      {
        title: "Sách giáo trình",
        icon: "📚",
        content: "• 當代中文課程 (Contemporary Chinese) — giáo trình chính thức tại Đài Loan\n• 實用視聽華語 (Practical Audio-Visual Chinese) — phổ biến nhất\n• 新版實用視聽華語 — phiên bản cập nhật\n• 華語八千詞 — từ điển TOCFL chính thức",
      },
      {
        title: "Ứng dụng (Apps)",
        icon: "📱",
        content: "• Pleco — từ điển Trung-Anh tốt nhất\n• Anki — flashcard học từ vựng\n• HelloChinese — học qua trò chơi\n• Skritter — luyện viết chữ Hán\n• LingQ — đọc hiểu theo cấp độ",
      },
      {
        title: "Website",
        icon: "🌐",
        content: "• tocfl.edu.tw — đề thi thử TOCFL\n• chineselearnonline.com — bài học online\n• mandarinbean.com — listening practice\n• Chinese Text Analyser — phân tích đoạn văn\n• Zhongwen.com — tra từ điển phồn thể",
      },
      {
        title: "YouTube Channels",
        icon: "🎥",
        content: "• ChinesePod — bài học đa cấp độ\n• Learn Chinese with Grace — tiếng Trung Đài Loan\n• Mandarin Corner — tình huống thực tế\n• TaiwaneseMandarinDaily — tiếng Trung Đài Loan daily",
      },
    ],
  },
];

// ── Helper functions ─────────────────────────────────────────────────────────

export function getStudyProgramContent(slug: string): ContentPage | null {
  return studyPrograms.find((p) => p.slug === slug) ?? null;
}

export function getExperienceContent(slug: string): ContentPage | null {
  return experienceGuides.find((p) => p.slug === slug) ?? null;
}

export function getChineseContent(slug: string): ContentPage | null {
  return chineseResources.find((p) => p.slug === slug) ?? null;
}
