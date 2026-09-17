"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useLanguage } from "@/lib/LanguageContext";

export default function PujaSamagriPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSaleType, setSelectedSaleType] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSaleType]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedSaleType) params.set("saleType", selectedSaleType);
      
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
        if (data.categories) setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    setLoading(false);
  }

  const getSaleTypeLabel = (type) => {
    if (type === "rent") return t("pages.samagri.rent") || "Rent";
    if (type === "buy") return t("pages.samagri.buy") || "Buy";
    if (type === "both") return t("pages.samagri.rentBuy") || "Rent & Buy";
    return type;
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <section className="bg-gradient-to-r from-gold-500 to-gold-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-sm font-medium text-gold-200 uppercase tracking-wider">
              {t("pages.samagri.badge") || "Shop Essentials"}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-4">
              {t("pages.samagri.title") || "Puja Samagri"}
            </h1>
            <p className="text-lg text-gold-100 max-w-2xl">
              {t("pages.samagri.desc") || "Authentic puja items, sacred materials, and ceremonial essentials. Buy or rent quality products for your spiritual needs."}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedCategory ? "bg-saffron-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("pages.samagri.allCategories") || "All Categories"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat ? "bg-saffron-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="w-px h-8 bg-gray-200 mx-2 self-center" />

            {["rent", "buy", "both"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedSaleType(selectedSaleType === type ? "" : type)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedSaleType === type ? "bg-ganga-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {getSaleTypeLabel(type)}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner text={t("pages.samagri.loading") || "Loading products..."} />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">🛍️</span>
              <p className="text-gray-500">{t("pages.samagri.empty") || "No products found matching your filters."}</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
