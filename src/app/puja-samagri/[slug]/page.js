export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { formatPrice } from "@/lib/utils";

async function getProduct(slug) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug, isActive: true }).lean();
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name, description: product.shortDescription || product.description?.substring(0, 160) };
}

export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const image = product.images?.[0]?.url || "https://placehold.co/800x600/FFFEFB/E8820F?text=Kashi+Vandana";

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src={image} alt={product.name} fill className="object-cover" sizes="50vw" priority />
              <div className="absolute top-4 left-4 flex gap-2">
                {(product.saleType === "rent" || product.saleType === "both") && (
                  <span className="px-3 py-1 rounded-full bg-ganga-500 text-white text-xs font-bold">Rent</span>
                )}
                {(product.saleType === "buy" || product.saleType === "both") && (
                  <span className="px-3 py-1 rounded-full bg-saffron-500 text-white text-xs font-bold">Buy</span>
                )}
                {product.isConsumable && (
                  <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">Consumable</span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-saffron-600 font-medium uppercase tracking-wider">{product.category}</span>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{product.name}</h1>
              </div>

              {/* Pricing */}
              <div className="p-6 rounded-2xl bg-cream-50 border border-saffron-100">
                {product.saleType === "both" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Buy Price:</span>
                      <span className="text-2xl font-bold text-saffron-700">{formatPrice(product.buyPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rent Price:</span>
                      <span className="text-2xl font-bold text-ganga-600">{formatPrice(product.rentPrice)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{product.saleType === "rent" ? "Rent" : "Buy"} Price:</span>
                    <span className="text-3xl font-bold text-saffron-700">{formatPrice(product.price)}</span>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-saffron-100">
                  <span className={`text-sm font-medium ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-gold-600" : "text-red-600"}`}>
                    {product.stock > 10 ? `✅ In Stock (${product.stock} available)` : product.stock > 0 ? `⚠️ Only ${product.stock} left` : "❌ Out of Stock"}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/booking?type=samagri&product=${product._id}&name=${encodeURIComponent(product.name)}&price=${product.price}`}
                  className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white text-center font-semibold shadow-lg shadow-saffron-200 hover:shadow-saffron-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  🛍️ Order Now
                </Link>
                <a
                  href={`https://wa.me/916206687491?text=Namaste!%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${formatPrice(product.price)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl bg-green-500 text-white text-center font-semibold hover:bg-green-400 transition-colors"
                >
                  💬 Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
