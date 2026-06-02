---
description: Quy trình làm website nhanh bằng phương pháp clone + tùy chỉnh và deploy miễn phí lên Vercel
---

# Quy trình làm Website nhanh (Clone + Tùy chỉnh)

## Tổng quan

Phương pháp này giúp xây dựng website **nhanh gấp 3-5 lần** so với code từ đầu bằng cách tham khảo website mẫu có sẵn, clone bố cục & tính năng, rồi tùy chỉnh nội dung cho phù hợp.

## Khi nào nên dùng

- Website trường học, bệnh viện, doanh nghiệp (cấu trúc tương tự nhau)
- Cần triển khai nhanh, không cần thiết kế quá khác biệt
- Ngân sách hạn chế (deploy miễn phí)

---

## Bước 1: Thu thập yêu cầu

Hỏi user:
1. **Link 1-2 website mẫu** cùng ngành/lĩnh vực (bắt buộc)
2. **Ghi chú**: thích phần nào, không thích phần nào
3. **Nội dung**: logo, ảnh, thông tin trường/tổ chức, liên hệ
4. **Tính năng đặc biệt**: tuyển sinh online, thông báo sinh viên, dashboard...

## Bước 2: Phân tích website mẫu

// turbo
1. Mở website mẫu bằng browser tool → chụp screenshot
2. Phân tích bố cục: header, menu, slider, nội dung, footer
3. Xác định các trang cần có: trang chủ, giới thiệu, tin tức, liên hệ...
4. Liệt kê tính năng: form liên hệ, tuyển sinh, admin panel...

## Bước 3: Tạo dự án Next.js

```bash
npx -y create-next-app@latest ./ --js --no-tailwind --no-src-dir --eslint --no-turbopack --import-alias "@/*"
```

Cài đặt dependencies cần thiết:
```bash
npm install prisma @prisma/client next-auth bcryptjs
npx prisma init --datasource-provider sqlite
```

> **Ghi chú**: Dùng SQLite khi phát triển localhost cho đơn giản. Chuyển sang PostgreSQL (Neon) khi deploy.

## Bước 4: Phát triển trên localhost

Thứ tự phát triển:
1. **Schema database** (`prisma/schema.prisma`) → `npx prisma db push`
2. **Seed data** (`prisma/seed.js`) → `node prisma/seed.js`
3. **Layout chung**: Header, Footer, styles.css
4. **Trang chủ**: Slider, features, tin tức
5. **Các trang con**: Giới thiệu, tin tức, tuyển sinh, liên hệ
6. **Admin panel**: Đăng nhập, quản lý bài viết, cấu hình
7. **SEO**: meta tags, sitemap, robots.txt, SchemaOrg

## Bước 5: Test trên localhost

```bash
npm run dev
```

Kiểm tra:
- [ ] Tất cả trang hiển thị đúng
- [ ] Form gửi được
- [ ] Admin đăng nhập & quản lý được
- [ ] Responsive mobile

---

## Bước 6: Chuẩn bị deploy (chuyển sang PostgreSQL)

### 6.1 Tạo database Neon
1. Vào [neon.tech](https://neon.tech) → đăng nhập bằng GitHub
2. Tạo project → Region: **Singapore** → Copy Connection string

### 6.2 Sửa `prisma/schema.prisma`
```diff
 datasource db {
-  provider = "sqlite"
-  url      = env("DATABASE_URL")
+  provider  = "postgresql"
+  url       = env("DATABASE_URL")
+  directUrl = env("DIRECT_URL")
 }
```
- Thêm `@db.Text` cho các trường text dài (content, message...)

### 6.3 Cập nhật `.env`
```env
DATABASE_URL="postgresql://...pooler...neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://...(bỏ -pooler)...neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="chuỗi-bí-mật"
```

### 6.4 Cập nhật `package.json`
```json
"build": "prisma generate && next build",
"postinstall": "prisma generate"
```

### 6.5 Push schema & seed
```bash
npx prisma db push
node prisma/seed.js
```

## Bước 7: Push lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## Bước 8: Deploy lên Vercel

```bash
npx vercel login
npx vercel --prod --yes \
  -e DATABASE_URL="..." \
  -e DIRECT_URL="..." \
  -e NEXTAUTH_SECRET="..."
```

Đặt alias ngắn gọn:
```bash
npx vercel alias DEPLOYMENT_URL ten-ngan.vercel.app
```

## Bước 9: Cập nhật sau này

```bash
# Sửa code → test localhost → commit → push → deploy
git add . && git commit -m "mô tả" && git push
npx vercel --prod --yes
npx vercel alias DEPLOYMENT_URL ten-ngan.vercel.app
```

---

## Mẹo làm nhanh

1. **Website mẫu là tất cả** — Có mẫu tốt = tiết kiệm 70% thời gian thiết kế
2. **Dùng SQLite khi dev** — Không cần cài database server, file local đơn giản
3. **Chuyển PostgreSQL khi deploy** — Chỉ sửa schema + .env, mất 5 phút
4. **Neon + Vercel = 0đ** — Free tier đủ cho hàng chục nghìn bài viết
5. **Seed data sớm** — Có dữ liệu mẫu giúp test nhanh, demo cho user xem ngay
6. **Admin panel từ đầu** — Cho user quản lý nội dung mà không cần biết code
7. **Component tái sử dụng** — Header, Footer, Form... dùng lại cho nhiều dự án
8. **Alias Vercel** — Đặt tên ngắn `ten-ngan.vercel.app` cho dễ nhớ

---

## Tech Stack chuẩn

| Thành phần | Công nghệ | Lý do |
|---|---|---|
| Framework | Next.js (App Router) | SSR, SEO tốt, miễn phí trên Vercel |
| Database dev | SQLite | Không cần cài đặt, file local |
| Database prod | PostgreSQL (Neon) | Free 0.5GB, cloud, ổn định |
| ORM | Prisma | Type-safe, dễ dùng |
| Auth | NextAuth.js | Tích hợp sẵn Next.js |
| CSS | Vanilla CSS | Không dependency, toàn quyền kiểm soát |
| Hosting | Vercel | Free, auto-deploy, CDN global |
| Source | GitHub | Free private repo |
