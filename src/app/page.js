export const dynamic = "force-dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import connectDB from "@/lib/mongodb";
import Ghat from "@/models/Ghat";
import Service from "@/models/Service";
import Pandit from "@/models/Pandit";
import Product from "@/models/Product";
import Review from "@/models/Review";
import HomeContent from "@/components/HomeContent";

async function getData() {
  try {
    await connectDB();
    const [ghats, services, pandits, products, reviews] = await Promise.all([
      Ghat.find({ isActive: true, featured: true }).limit(4).lean(),
      Service.find({ isActive: true, featured: true }).limit(4).lean(),
      Pandit.find({ isActive: true, featured: true }).limit(3).lean(),
      Product.find({ isActive: true, featured: true }).limit(4).lean(),
      Review.find({ isApproved: true }).sort("-createdAt").limit(6).lean(),
    ]);
    return {
      ghats: JSON.parse(JSON.stringify(ghats)),
      services: JSON.parse(JSON.stringify(services)),
      pandits: JSON.parse(JSON.stringify(pandits)),
      products: JSON.parse(JSON.stringify(products)),
      reviews: JSON.parse(JSON.stringify(reviews)),
    };
  } catch {
    return { ghats: [], services: [], pandits: [], products: [], reviews: [] };
  }
}

export default async function Home() {
  const { ghats, services, pandits, products, reviews } = await getData();

  return (
    <>
      <Header />
      <HomeContent 
        ghats={ghats} 
        services={services} 
        pandits={pandits} 
        products={products} 
        reviews={reviews} 
      />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
