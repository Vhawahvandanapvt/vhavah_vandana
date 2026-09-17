import { NextResponse } from "next/server";
import { validateCredentials, createSessionToken, getSessionCookieName } from "@/lib/auth";

// POST /api/admin/auth — Admin login
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const cookieName = getSessionCookieName();

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/auth error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/auth — Admin logout
export async function DELETE() {
  try {
    const cookieName = getSessionCookieName();
    const response = NextResponse.json({
      success: true,
      message: "Logged out",
    });

    response.cookies.set(cookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("DELETE /api/admin/auth error:", error);
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
  }
}
