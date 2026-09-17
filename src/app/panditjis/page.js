export const dynamic = "force-dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PanditCard from "@/components/PanditCard";
import connectDB from "@/lib/mongodb";
import Pandit from "@/models/Pandit";

import ListingPageHero from "@/components/ListingPageHero";
import EmptyListState from "@/components/EmptyListState";

export const metadata = {
  title: "Book Pandit Ji",
  description: "Find and book experienced Vedic pandits in Varanasi for pujas, weddings, havans, and all Hindu ceremonies.",
};

async function getPandits() {
  try {
    await connectDB();
    const pandits = await Pandit.find({ isActive: true }).sort("-featured -rating").lean();
    return JSON.parse(JSON.stringify(pandits));
  } catch {
    return [];
  }
}

export default async function PanditjisPage() {
  const pandits = await getPandits();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <ListingPageHero
          pageKey="pandit"
          gradient="from-saffron-600 to-maroon-700"
          badgeColor="text-saffron-200"
          descColor="text-saffron-100"
          fallbackBadge="Expert Guidance"
          fallbackTitle="Our Pandit Ji"
          fallbackDesc="Experienced Vedic scholars and priests for all Hindu ceremonies. Each pandit brings years of knowledge and devotion."
        />

        <section className="max-w-7xl mx-auto px-4 py-12">
          {pandits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pandits.map((pandit) => (
                <PanditCard key={pandit._id} pandit={pandit} />
              ))}
            </div>
          ) : (
            <EmptyListState
              icon="🙏"
              pageKey="pandit"
              fallbackText="No pandits available yet."
            />
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
