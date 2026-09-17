export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ghat from "@/models/Ghat";
import { isAdmin } from "@/lib/auth";

// GET /api/ghats — List all active ghats
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit")) || 20;
    const page = parseInt(searchParams.get("page")) || 1;
    const sort = searchParams.get("sort") || "-createdAt";

    const query = { isActive: true };
    if (featured === "true") query.featured = true;

    const skip = (page - 1) * limit;
    const [ghats, total] = await Promise.all([
      Ghat.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Ghat.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: ghats,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/ghats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch ghats" },
      { status: 500 }
    );
  }
}

// POST /api/ghats — Create a new ghat (admin only)
export async function POST(request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const ghat = await Ghat.create(body);

    return NextResponse.json({ success: true, data: ghat }, { status: 201 });
  } catch (error) {
    console.error("POST /api/ghats error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create ghat" },
      { status: 500 }
    );
  }
}
