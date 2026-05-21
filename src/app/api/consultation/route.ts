import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, program, level, message } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin bắt buộc (họ tên, email, số điện thoại)." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    // Log the submission (in production, save to Notion/DB/email)
    console.log("📋 New consultation request:", {
      name,
      email,
      phone,
      program: program || "Chưa chọn",
      level: level || "Chưa chọn",
      message: message || "Không có",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ bạn trong vòng 24 giờ.",
    });
  } catch {
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
