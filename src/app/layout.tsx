import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DuHocToday – Du học Đài Loan chuyên nghiệp",
    template: "%s | DuHocToday",
  },
  description:
    "Kênh thông tin du học Đài Loan hàng đầu: học bổng, trường học, hồ sơ, tiếng Trung TOCFL và kinh nghiệm sống tại Đài Loan.",
  keywords: ["du học đài loan", "học bổng đài loan", "TOCFL", "đại học đài loan"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "DuHocToday",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
