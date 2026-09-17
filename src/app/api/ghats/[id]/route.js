export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ghat from "@/models/Ghat";
import { isAdmin } from "@/lib/auth";

// GET /api/ghats/[id] — Get a single ghat by ID or slug
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let ghat;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      ghat = await Ghat.findById(id).lean();
    } else {
      ghat = await Ghat.findOne({ slug: id }).lean();
    }

    if (!ghat) {
      return NextResponse.json(
        { success: false, error: "Ghat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: ghat });
  } catch (error) {
    console.error("GET /api/ghats/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch ghat" },
      { status: 500 }
    );
  }
}

// PUT /api/ghats/[id] — Update a ghat (admin only)
export async function PUT(request, { params }) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const ghat = await Ghat.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!ghat) {
      return NextResponse.json(
        { success: false, error: "Ghat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: ghat });
  } catch (error) {
    console.error("PUT /api/ghats/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update ghat" },
      { status: 500 }
    );
  }
}

// DELETE /api/ghats/[id] — Delete a ghat (admin only)
export async function DELETE(request, { params }) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    const ghat = await Ghat.findByIdAndDelete(id);
    if (!ghat) {
      return NextResponse.json(
        { success: false, error: "Ghat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Ghat deleted" });
  } catch (error) {
    console.error("DELETE /api/ghats/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete ghat" },
      { status: 500 }
    );
  }
}
