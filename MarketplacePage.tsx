import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ShieldCheck } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS_DATA } from "./data";

interface MarketplacePageProps {
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: (productId: string) => void;
}

const CATEGORIES = ["All", "Reef Fish", "Freshwater", "Rare & Exotic", "Schooling Fish"];
const SORT_OPTIONS = [
  { value: "relevant", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "rating", label: "Seller Rating" },
];

export function MarketplacePage({ onNavigate, onAddToCart }: MarketplacePageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [captiveOnly, setCaptiveOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevant");
  const [filterOpen, setFilterOpen] = useState(false);

  const products = useMemo(() => {
    let result = [...PRODUCTS_DATA];
    if (captiveOnly) result = result.filter((p) => p.captiveBred);
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.sellerRating - a.sellerRating);
    return result;
  }, [captiveOnly, sortBy]);

  return (
    <div style={{ background: "#0B2545", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-24 pb-10 px-6 lg:px-10" style={{ background: "linear-gradient(to bottom, #071A36, #0B2545)" }}>
        <div className="max-w-[1280px] mx-auto">
          <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: "#8DA9C4" }}>
            <button onClick={() => onNavigate("home")} className="hover:text-amber-400 transition-colors">Home</button>
            <span>/</span>
            <span style={{ color: "#E6EDF3" }}>Marketplace</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#EEB902" }}>Marketplace</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#E6EDF3" }}>
            Verified Ornamental Fish
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm" style={{ color: "#8DA9C4" }}>
            <ShieldCheck size={15} style={{ color: "#1A9E5C" }} />
            Every seller verified · Live arrival guaranteed
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat ? "#EEB902" : "#134074",
                color: activeCategory === cat ? "#0B2545" : "#8DA9C4",
                border: `1px solid ${activeCategory === cat ? "#EEB902" : "rgba(141, 169, 196, 0.20)"}`,
                fontFamily: "var(--font-display)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trust banner */}
        <div
          className="flex flex-wrap gap-4 p-4 rounded-xl mb-8"
          style={{ background: "rgba(26, 158, 92, 0.08)", border: "1px solid rgba(26, 158, 92, 0.20)" }}
        >
          {[
            { icon: "✅", text: "All sellers ID-verified" },
            { icon: "📦", text: "Live arrival guarantee on all orders" },
            { icon: "🌿", text: "Filter for captive-bred species" },
            { icon: "🔒", text: "Secure Stripe-powered checkout" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs" style={{ color: "#8DA9C4" }}>
              <span>{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setCaptiveOnly(!captiveOnly)}
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background: captiveOnly ? "#1A9E5C" : "transparent",
                  border: `1.5px solid ${captiveOnly ? "#1A9E5C" : "rgba(141, 169, 196, 0.30)"}`,
                }}
              >
                {captiveOnly && <span style={{ fontSize: "0.6rem", color: "#fff", fontWeight: 700 }}>✓</span>}
              </div>
              <span className="text-sm" style={{ color: "#8DA9C4" }}>Captive Bred Only</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: "#8DA9C4" }}>{products.length} listings</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: "#134074", color: "#E6EDF3", border: "1px solid rgba(141, 169, 196, 0.20)" }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onNavigate("product", product.id)}
              onAddToCart={() => onAddToCart(product.id)}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🪣</p>
            <p style={{ color: "#E6EDF3", fontFamily: "var(--font-display)", fontWeight: 600 }}>No listings found</p>
            <button
              onClick={() => setCaptiveOnly(false)}
              className="mt-4 px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)" }}
            >
              Show All Listings
            </button>
          </div>
        )}

        {/* Seller CTA */}
        <div
          className="mt-12 p-6 lg:p-8 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #134074, #1A4F85)", border: "1px solid rgba(141, 169, 196, 0.20)" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#EEB902" }}>For Businesses</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "#E6EDF3" }}>
              Sell on FishVerse
            </h3>
            <p className="mt-2 text-sm" style={{ color: "#8DA9C4" }}>
              Join our network of verified breeders and wholesalers. No listing fees. Only pay when you sell.
            </p>
          </div>
          <button
            className="flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}
          >
            Apply as Seller →
          </button>
        </div>
      </div>
    </div>
  );
}
