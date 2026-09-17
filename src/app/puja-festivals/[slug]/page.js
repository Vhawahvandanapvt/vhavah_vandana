export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { formatPrice } from "@/lib/utils";

async function getService(slug) {
  try {
    await connectDB();
    const service = await Service.findOne({ slug, isActive: true }).lean();
    return service ? JSON.parse(JSON.stringify(service)) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service Not Found" };
  return { title: service.name, description: service.shortDescription || service.description?.substring(0, 160) };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const image = service.images?.[0]?.url || "https://placehold.co/800x600/FFFEFB/E8820F?text=Kashi+Vandana";

  return (
    <>
      <Header />
      <main className="pt-20 pb-20 min-h-screen">
        <div className="relative h-[45vh] min-h-[350px]">
          <Image src={image} alt={service.name} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <span className="px-2.5 py-1 rounded-full bg-saffron-500/80 text-white text-xs font-bold mb-2 inline-block">🪔 Puja & Festival</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">{service.name}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{service.description}</p>
              </div>

              {service.inclusions?.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">What&apos;s Included</h3>
                  <ul className="space-y-2">
                    {service.inclusions.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <span className="text-green-500">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.requirements?.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {service.requirements.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <span className="text-saffron-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-saffron-50 to-cream-100 border-b border-saffron-100">
                  <p className="text-sm text-saffron-600 font-medium">Price</p>
                  <p className="text-3xl font-bold text-saffron-700">{formatPrice(service.price)}</p>
                  {service.priceNote && <p className="text-xs text-gray-500 mt-1">{service.priceNote}</p>}
                </div>
                <div className="p-6 space-y-4">
                  {service.duration && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>⏱️</span><span>Duration: {service.duration}</span>
                    </div>
                  )}
                  <Link
                    href={`/booking?type=puja&service=${service._id}&name=${encodeURIComponent(service.name)}&price=${service.price}`}
                    className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white text-center font-semibold shadow-lg shadow-saffron-200 hover:shadow-saffron-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    🪔 Book This Service
                  </Link>
                  <a
                    href={`https://wa.me/916206687491?text=Namaste!%20I%20want%20to%20book%20${encodeURIComponent(service.name)}.`}
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
