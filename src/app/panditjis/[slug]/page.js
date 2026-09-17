export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Rating from "@/components/Rating";
import connectDB from "@/lib/mongodb";
import Pandit from "@/models/Pandit";
import Review from "@/models/Review";
import { formatPrice } from "@/lib/utils";

async function getPandit(slug) {
  try {
    await connectDB();
    const pandit = await Pandit.findOne({ slug, isActive: true }).lean();
    if (!pandit) return { pandit: null, reviews: [] };
    const reviews = await Review.find({ entityType: "pandit", entityId: pandit._id, isApproved: true }).sort("-createdAt").limit(10).lean();
    return {
      pandit: JSON.parse(JSON.stringify(pandit)),
      reviews: JSON.parse(JSON.stringify(reviews)),
    };
  } catch {
    return { pandit: null, reviews: [] };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { pandit } = await getPandit(slug);
  if (!pandit) return { title: "Pandit Not Found" };
  return { title: pandit.name, description: pandit.shortBio || pandit.bio?.substring(0, 160) };
}

export default async function PanditDetail({ params }) {
  const { slug } = await params;
  const { pandit, reviews } = await getPandit(slug);
  if (!pandit) notFound();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 ring-4 ring-saffron-100 shadow-xl">
                  <Image
                    src={pandit.profileImage || "https://placehold.co/800x600/FFFEFB/E8820F?text=Kashi+Vandana"}
                    alt={pandit.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority
                  />
                </div>
                <div>
                  <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">{pandit.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Rating rating={pandit.rating} count={pandit.reviewsCount} size="md" />
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      pandit.availability === "available" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}>
                      {pandit.availability === "available" ? "✅ Available" : "❌ Unavailable"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">🕐 {pandit.experience}+ years of experience</p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{pandit.bio}</p>
              </div>

              {pandit.specializations?.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {pandit.specializations.map((spec) => (
                      <span key={spec} className="px-4 py-2 rounded-full bg-saffron-50 text-saffron-700 text-sm font-medium border border-saffron-200">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {pandit.languages?.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {pandit.languages.map((lang) => (
                      <span key={lang} className="px-4 py-2 rounded-full bg-ganga-50 text-ganga-700 text-sm font-medium border border-ganga-200">
                        🗣️ {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {reviews.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">Reviews ({reviews.length})</h3>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="p-5 rounded-xl bg-cream-50 border border-gray-100">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < review.rating ? "text-gold-500" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 italic">&ldquo;{review.review}&rdquo;</p>
                        <p className="text-xs text-gray-400 mt-2">— {review.customerName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-saffron-50 to-cream-100 border-b border-saffron-100">
                  <p className="text-sm text-saffron-600 font-medium">Starting from</p>
                  <p className="text-3xl font-bold text-saffron-700">{formatPrice(pandit.price)}</p>
                  {pandit.priceNote && <p className="text-xs text-gray-500 mt-1">{pandit.priceNote}</p>}
                </div>
                <div className="p-6 space-y-4">
                  <Link
                    href={`/booking?type=pandit&pandit=${pandit._id}&name=${encodeURIComponent(pandit.name)}&price=${pandit.price}`}
                    className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white text-center font-semibold shadow-lg shadow-saffron-200 hover:shadow-saffron-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    🙏 Book Pandit Ji
                  </Link>
                  <a
                    href={`https://wa.me/916206687491?text=Namaste!%20I%20want%20to%20book%20${encodeURIComponent(pandit.name)}%20for%20a%20ceremony.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 rounded-xl bg-green-500 text-white text-center font-semibold hover:bg-green-400 transition-colors"
                  >
                    💬 Enquire on WhatsApp
                  </a>
                </div>
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
