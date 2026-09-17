export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { isAdmin } from "@/lib/auth";

// GET /api/users — List users with search, role filter, and pagination (admin only)
export async function GET(request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const role = searchParams.get("role");
    const limit = parseInt(searchParams.get("limit")) || 20;
    const page = parseInt(searchParams.get("page")) || 1;

    const query = {};

    if (role && role !== "all") {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [users, total, customerCount, adminCount] = await Promise.all([
      User.find(query).sort("-createdAt").skip(skip).limit(limit).lean(),
      User.countDocuments(query),
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "admin" }),
    ]);

    return NextResponse.json({
      success: true,
      data: users,
      stats: { total: await User.countDocuments({}), customerCount, adminCount },
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/users — Create a new user (admin only)
export async function POST(request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const { name, phone, email, role } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Check for existing user with same phone
    const existing = await User.findOne({ phone });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A user with this phone number already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({ name, phone, email, role: role || "customer" });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}
