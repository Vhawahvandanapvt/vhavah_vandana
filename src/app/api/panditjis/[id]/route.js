export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pandit from "@/models/Pandit";
import { isAdmin } from "@/lib/auth";

// GET /api/panditjis/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let pandit;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      pandit = await Pandit.findById(id).lean();
    } else {
      pandit = await Pandit.findOne({ slug: id }).lean();
    }

    if (!pandit) {
      return NextResponse.json({ success: false, error: "Pandit not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: pandit });
  } catch (error) {
    console.error("GET /api/panditjis/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch pandit" }, { status: 500 });
  }
}

// PUT /api/panditjis/[id]
export async function PUT(request, { params }) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const pandit = await Pandit.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!pandit) {
      return NextResponse.json({ success: false, error: "Pandit not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: pandit });
  } catch (error) {
    console.error("PUT /api/panditjis/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update pandit" }, { status: 500 });
  }
}

// DELETE /api/panditjis/[id]
export async function DELETE(request, { params }) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const pandit = await Pandit.findByIdAndDelete(id);
    if (!pandit) {
      return NextResponse.json({ success: false, error: "Pandit not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Pandit deleted" });
  } catch (error) {
    console.error("DELETE /api/panditjis/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete pandit" }, { status: 500 });
  }
}
