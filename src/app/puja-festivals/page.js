export const dynamic = "force-dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceCard from "@/components/ServiceCard";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

import ListingPageHero from "@/components/ListingPageHero";
import EmptyListState from "@/components/EmptyListState";

export const metadata = {
  title: "Puja & Festival Services",
  description: "Book authentic Vedic pujas, havans, and festival ceremonies in Varanasi. Experienced pandits and complete puja arrangements.",
};

async function getServices() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true, category: "puja-festival" }).sort("-featured -createdAt").lean();
    return JSON.parse(JSON.stringify(services));
  } catch {
    return [];
  }
}

export default async function PujaFestivalsPage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <ListingPageHero
          pageKey="puja"
          gradient="from-saffron-500 to-saffron-700"
          badgeColor="text-saffron-200"
          descColor="text-saffron-100"
          fallbackBadge="Sacred Ceremonies"
          fallbackTitle="Puja & Festivals"
          fallbackDesc="Authentic Vedic pujas, havans, and festival ceremonies performed by experienced pandits in the holy city of Varanasi."
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
              icon="🪔"
              pageKey="puja"
              fallbackText="No services available yet."
            />
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
