export const dynamic = "force-dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GhatCard from "@/components/GhatCard";
import connectDB from "@/lib/mongodb";
import Ghat from "@/models/Ghat";

import ListingPageHero from "@/components/ListingPageHero";
import EmptyListState from "@/components/EmptyListState";

export const metadata = {
  title: "Sacred Ghats of Varanasi",
  description: "Explore and book the sacred ghats of Varanasi/Kashi for your puja ceremonies, meditation, and spiritual experiences.",
};

async function getGhats() {
  try {
    await connectDB();
    const ghats = await Ghat.find({ isActive: true }).sort("-featured -rating").lean();
    return JSON.parse(JSON.stringify(ghats));
  } catch {
    return [];
  }
}

export default async function GhatsPage() {
  const ghats = await getGhats();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        {/* Hero */}
        <ListingPageHero
          pageKey="ghats"
          gradient="from-ganga-600 to-ganga-800"
          badgeColor="text-ganga-200"
          descColor="text-ganga-100"
          fallbackBadge="Sacred Spaces"
          fallbackTitle="Ghats of Varanasi"
          fallbackDesc="Explore the sacred ghats along the holy Ganga river. Each ghat holds centuries of spiritual significance and offers unique ceremonial experiences."
        />

        {/* Listings */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          {ghats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ghats.map((ghat) => (
                <GhatCard key={ghat._id} ghat={ghat} />
              ))}
            </div>
          ) : (
            <EmptyListState
              icon="🏛️"
              pageKey="ghats"
              fallbackText="No ghats available yet. Please seed the database."
            />
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
