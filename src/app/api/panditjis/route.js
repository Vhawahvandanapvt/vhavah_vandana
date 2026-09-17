export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pandit from "@/models/Pandit";
import { isAdmin } from "@/lib/auth";

// GET /api/panditjis — List pandits with filters
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get("specialization");
    const language = searchParams.get("language");
    const availability = searchParams.get("availability");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit")) || 20;
    const page = parseInt(searchParams.get("page")) || 1;
    const sort = searchParams.get("sort") || "-rating";

    const query = { isActive: true };
    if (specialization) query.specializations = specialization;
    if (language) query.languages = language;
    if (availability) query.availability = availability;
    if (featured === "true") query.featured = true;

    const skip = (page - 1) * limit;
    const [pandits, total] = await Promise.all([
      Pandit.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Pandit.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: pandits,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/panditjis error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch pandits" }, { status: 500 });
  }
}

// POST /api/panditjis — Create pandit (admin only)
export async function POST(request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const pandit = await Pandit.create(body);

    return NextResponse.json({ success: true, data: pandit }, { status: 201 });
  } catch (error) {
    console.error("POST /api/panditjis error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to create pandit" }, { status: 500 });
  }
}
