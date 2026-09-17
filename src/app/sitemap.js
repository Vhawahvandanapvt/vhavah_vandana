import connectDB from "@/lib/mongodb";
import Ghat from "@/models/Ghat";
import Service from "@/models/Service";
import Product from "@/models/Product";
import Pandit from "@/models/Pandit";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://vhavahvandana.com";

export default async function sitemap() {
  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/ghats`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/puja-festivals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/marriage-celebrations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/puja-samagri`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/panditjis`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/booking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    await connectDB();
    const [ghats, services, products, pandits] = await Promise.all([
      Ghat.find({ isActive: true }).select("slug updatedAt").lean(),
      Service.find({ isActive: true }).select("slug category updatedAt").lean(),
      Product.find({ isActive: true }).select("slug updatedAt").lean(),
      Pandit.find({ isActive: true }).select("slug updatedAt").lean(),
    ]);

    const dynamicRoutes = [
      ...ghats.map((g) => ({
        url: `${BASE_URL}/ghats/${g.slug}`,
        lastModified: g.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      })),
      ...services.map((s) => ({
        url: `${BASE_URL}/${s.category === "marriage-celebration" ? "marriage-celebrations" : "puja-festivals"}/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      })),
      ...products.map((p) => ({
        url: `${BASE_URL}/puja-samagri/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      })),
      ...pandits.map((p) => ({
        url: `${BASE_URL}/panditjis/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      })),
    ];

    return [...staticRoutes, ...dynamicRoutes];
  } catch {
    return staticRoutes;
  }
}
