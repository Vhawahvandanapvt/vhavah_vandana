export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { isAdmin } from "@/lib/auth";

// GET /api/bookings — List bookings (admin only)
export async function GET(request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const bookingType = searchParams.get("bookingType");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit")) || 20;
    const page = parseInt(searchParams.get("page")) || 1;

    const query = {};
    if (status) query.status = status;
    if (bookingType) query.bookingType = bookingType;
    if (search) {
      query.$or = [
        { bookingId: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      Booking.find(query).sort("-createdAt").skip(skip).limit(limit).lean(),
      Booking.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST /api/bookings — Create a new booking (public)
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Remove empty strings from ObjectId fields to prevent Mongoose CastErrors
    const objectIdFields = ["ghatId", "serviceId", "panditId"];
    objectIdFields.forEach((field) => {
      if (body[field] === "") {
        delete body[field];
      }
    });

    if (Array.isArray(body.products)) {
      body.products = body.products.map(p => {
        if (p.productId === "") delete p.productId;
        return p;
      });
    }

    const booking = await Booking.create(body);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 });
  }
}
