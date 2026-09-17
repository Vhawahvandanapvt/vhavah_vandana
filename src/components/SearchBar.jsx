"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { debounce } from "@/lib/utils";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const search = debounce(async (q) => {
    if (!q || q.length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.success) setResults(data.data);
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  }, 300);

  const handleChange = (e) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const getLink = (type, item) => {
    switch (type) {
      case "ghats": return `/ghats/${item.slug}`;
      case "services": return item.category === "marriage-celebration" ? `/marriage-celebrations/${item.slug}` : `/puja-festivals/${item.slug}`;
      case "products": return `/puja-samagri/${item.slug}`;
      case "pandits": return `/panditjis/${item.slug}`;
      default: return "/";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "ghats": return "🏛️";
      case "services": return "🪔";
      case "products": return "🛍️";
      case "pandits": return "🙏";
      default: return "📌";
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case "ghats": return "Ghats";
      case "services": return "Services";
      case "products": return "Puja Samagri";
      case "pandits": return "Pandit Ji";
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="max-w-2xl mx-auto mt-20 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-saffron-100">
            <svg className="w-5 h-5 text-saffron-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search ghats, pujas, pandit ji, samagri..."
              className="flex-1 text-lg text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm font-medium">
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-3 border-saffron-200 border-t-saffron-500 rounded-full animate-spin" />
              </div>
            )}

            {!loading && results && (
              <div className="py-2">
                {Object.entries(results).map(([type, items]) =>
                  items.length > 0 ? (
                    <div key={type} className="px-4 py-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
                        {getIcon(type)} {getLabel(type)}
                      </p>
                      {items.map((item) => (
                        <Link
                          key={item._id}
                          href={getLink(type, item)}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-saffron-50 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-saffron-700">
                              {item.name?.en || item.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {item.shortDescription || item.shortBio || item.description?.substring(0, 80)}
                            </p>
                          </div>
                          {item.price && (
                            <span className="text-xs font-semibold text-saffron-600 shrink-0">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ) : null
                )}

                {results && Object.values(results).every((arr) => arr.length === 0) && (
                  <div className="py-12 text-center">
                    <p className="text-4xl mb-2">🔍</p>
                    <p className="text-gray-500">No results found for &ldquo;{query}&rdquo;</p>
                  </div>
                )}
              </div>
            )}

            {!loading && !results && query.length === 0 && (
              <div className="py-8 px-6 text-center">
                <p className="text-3xl mb-2">🪔</p>
                <p className="text-sm text-gray-500">Search for ghats, pujas, pandit ji, or puja samagri</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
