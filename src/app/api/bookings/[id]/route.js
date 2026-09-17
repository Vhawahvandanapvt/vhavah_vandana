export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { isAdmin } from "@/lib/auth";

// GET /api/bookings/[id] — Get single booking
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let booking;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      booking = await Booking.findById(id).lean();
    } else {
      booking = await Booking.findOne({ bookingId: id }).lean();
    }

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("GET /api/bookings/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch booking" }, { status: 500 });
  }
}

// PUT /api/bookings/[id] — Update booking status (admin only)
export async function PUT(request, { params }) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const booking = await Booking.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("PUT /api/bookings/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update booking" }, { status: 500 });
  }
}
