export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import Pandit from "@/models/Pandit";
import Ghat from "@/models/Ghat";
import { isAdmin } from "@/lib/auth";

// GET /api/reviews — List reviews with filters
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get("entityType");
    const entityId = searchParams.get("entityId");
    const approved = searchParams.get("approved");
    const limit = parseInt(searchParams.get("limit")) || 20;
    const page = parseInt(searchParams.get("page")) || 1;

    const query = {};
    if (entityType) query.entityType = entityType;
    if (entityId) query.entityId = entityId;
    if (approved !== null && approved !== undefined) {
      query.isApproved = approved === "true";
    } else {
      // Public requests only see approved reviews
      query.isApproved = true;
    }

    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      Review.find(query).sort("-createdAt").skip(skip).limit(limit).lean(),
      Review.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST /api/reviews — Submit a new review
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const review = await Review.create({
      ...body,
      isApproved: false, // Requires admin approval
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}

// PUT /api/reviews — Approve/reject review (admin only)
export async function PUT(request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { reviewId, isApproved } = body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { isApproved },
      { new: true }
    );

    if (!review) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }

    // Update entity rating if approved
    if (isApproved) {
      const reviews = await Review.find({
        entityType: review.entityType,
        entityId: review.entityId,
        isApproved: true,
      });

      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      const Model = review.entityType === "pandit" ? Pandit : Ghat;
      await Model.findByIdAndUpdate(review.entityId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewsCount: reviews.length,
      });
    }

    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    console.error("PUT /api/reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to update review" }, { status: 500 });
  }
}
