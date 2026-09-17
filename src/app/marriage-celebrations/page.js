export const dynamic = "force-dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceCard from "@/components/ServiceCard";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import Link from "next/link";

import ListingPageHero from "@/components/ListingPageHero";
import EmptyListState from "@/components/EmptyListState";
import CustomWeddingCta from "@/components/CustomWeddingCta";

export const metadata = {
  title: "Marriage & Celebration Services",
  description: "Traditional Hindu weddings, engagement ceremonies, and celebrations in the holy city of Varanasi. Authentic Vedic rituals with experienced pandits.",
};

async function getServices() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true, category: "marriage-celebration" }).sort("-featured -createdAt").lean();
    return JSON.parse(JSON.stringify(services));
  } catch {
    return [];
  }
}

export default async function MarriageCelebrationsPage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <ListingPageHero
          pageKey="marriage"
          gradient="from-maroon-600 to-maroon-800"
          badgeColor="text-maroon-200"
          descColor="text-maroon-100"
          fallbackBadge="Sacred Unions"
          fallbackTitle="Marriage & Celebrations"
          fallbackDesc="Celebrate life's most sacred moments with traditional Vedic ceremonies in the divine atmosphere of Varanasi."
        />

        <section className="max-w-7xl mx-auto px-4 py-12">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          ) : (
            <EmptyListState
              icon="💍"
              pageKey="marriage"
              fallbackText="No marriage services available yet."
            />
          )}

          {/* Custom Quote CTA */}
          <CustomWeddingCta />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
