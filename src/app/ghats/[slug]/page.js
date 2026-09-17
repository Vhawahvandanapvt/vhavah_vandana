export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Rating from "@/components/Rating";
import connectDB from "@/lib/mongodb";
import Ghat from "@/models/Ghat";
import { formatPrice } from "@/lib/utils";

async function getGhat(slug) {
  try {
    await connectDB();
    const ghat = await Ghat.findOne({ slug, isActive: true }).lean();
    return ghat ? JSON.parse(JSON.stringify(ghat)) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ghat = await getGhat(slug);
  if (!ghat) return { title: "Ghat Not Found" };
  return {
    title: ghat.name?.en || "Ghat",
    description: ghat.shortDescription || ghat.description?.substring(0, 160),
  };
}

export default async function GhatDetail({ params }) {
  const { slug } = await params;
  const ghat = await getGhat(slug);
  if (!ghat) notFound();

  const name = ghat.name?.en || "Ghat";
  const image = ghat.images?.[0]?.url || "https://placehold.co/800x600/FFFEFB/E8820F?text=Kashi+Vandana";

  return (
    <>
      <Header />
      <main className="pt-20 pb-20 min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <Image src={image} alt={name} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              {ghat.featured && (
                <span className="px-2.5 py-1 rounded-full bg-gold-500 text-white text-xs font-bold">Featured</span>
              )}
              <Rating rating={ghat.rating} count={ghat.reviewsCount} size="sm" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-1">{name}</h1>
            {ghat.name?.hi && <p className="text-saffron-300 text-lg">{ghat.name.hi}</p>}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">About this Ghat</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{ghat.description}</p>
              </div>

              {ghat.facilities?.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {ghat.facilities.map((f) => (
                      <span key={f} className="px-3 py-1.5 rounded-full bg-ganga-50 text-ganga-700 text-sm font-medium border border-ganga-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {ghat.suitableFor?.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">Suitable For</h3>
                  <div className="flex flex-wrap gap-2">
                    {ghat.suitableFor.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-full bg-saffron-50 text-saffron-700 text-sm font-medium border border-saffron-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-saffron-50 to-cream-100 border-b border-saffron-100">
                  <p className="text-sm text-saffron-600 font-medium">Starting from</p>
                  <p className="text-3xl font-bold text-saffron-700">{formatPrice(ghat.price)}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>👥</span>
                    <span>Capacity: {ghat.capacity}+ people</span>
                  </div>
                  {ghat.location?.address && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <span>📍</span>
                      <span>{ghat.location.address}</span>
                    </div>
                  )}
                  <Link
                    href={`/booking?type=ghat&ghat=${ghat._id}&name=${encodeURIComponent(name)}&price=${ghat.price}`}
                    className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white text-center font-semibold shadow-lg shadow-saffron-200 hover:shadow-saffron-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    🪔 Book This Ghat
                  </Link>
                  <a
                    href={`https://wa.me/916206687491?text=Namaste!%20I%20am%20interested%20in%20booking%20${encodeURIComponent(name)}.`}
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
