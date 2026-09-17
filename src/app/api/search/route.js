export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ghat from "@/models/Ghat";
import Service from "@/models/Service";
import Product from "@/models/Product";
import Pandit from "@/models/Pandit";

// GET /api/search?q=... — Global search across all collections
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.trim().length < 2) {
      return NextResponse.json({
        success: true,
        data: { ghats: [], services: [], products: [], pandits: [] },
      });
    }

    const regex = { $regex: q, $options: "i" };
    const activeFilter = { isActive: true };

    const [ghats, services, products, pandits] = await Promise.all([
      Ghat.find({ ...activeFilter, $or: [{ "name.en": regex }, { "name.hi": regex }, { description: regex }] })
        .limit(5)
        .lean(),
      Service.find({ ...activeFilter, $or: [{ name: regex }, { description: regex }] })
        .limit(5)
        .lean(),
      Product.find({ ...activeFilter, $or: [{ name: regex }, { description: regex }] })
        .limit(5)
        .lean(),
      Pandit.find({ ...activeFilter, $or: [{ name: regex }, { specializations: regex }] })
        .limit(5)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: { ghats, services, products, pandits },
      totalResults: ghats.length + services.length + products.length + pandits.length,
    });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 });
  }
}
