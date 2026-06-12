import { useState } from "react";
import { ArrowLeft, Heart, Minus, Plus, Star, ShieldCheck, Leaf, Package, Lock, Truck, ChevronDown } from "lucide-react";
import { PRODUCTS_DATA, SPECIES_DATA, IUCN_COLORS, IUCN_LABELS } from "./data";

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: (productId: string) => void;
}

const TABS = ["Description", "Care Guide", "Reviews", "Shipping"];

const REVIEWS = [
  { author: "Robert T.", rating: 5, date: "May 2026", text: "Arrived healthy, eating well. Seller communicated proactively throughout the shipping process. Would buy again." },
  { author: "Aya K.", rating: 4, date: "Apr 2026", text: "Beautiful specimen. Took a day to settle in but now completely settled and eating. Great packaging." },
  { author: "Marcus L.", rating: 5, date: "Mar 2026", text: "Best seller I've used for marine fish. The 21-day quarantine makes a real difference — zero disease issues." },
];

export function ProductDetailPage({ productId, onNavigate, onAddToCart }: ProductDetailPageProps) {
  const product = PRODUCTS_DATA.find((p) => p.id === productId);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [savedWish, setSavedWish] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return (
    <div style={{ background: "#0B2545", minHeight: "100vh" }} className="flex items-center justify-center">
      <p style={{ color: "#8DA9C4" }}>Product not found.</p>
    </div>
  );

  const species = SPECIES_DATA.find((s) => s.id === product.speciesId);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart(product.id);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: "#0B2545", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-6 lg:px-10" style={{ background: "#071A36" }}>
        <div className="max-w-[1280px] mx-auto">
          <nav className="flex items-center gap-2 text-xs" style={{ color: "#8DA9C4" }}>
            <button onClick={() => onNavigate("home")} className="hover:text-amber-400 transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate("marketplace")} className="hover:text-amber-400 transition-colors">Marketplace</button>
            <span>/</span>
            <span style={{ color: "#E6EDF3" }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
        <button
          onClick={() => onNavigate("marketplace")}
          className="flex items-center gap-2 mb-8 text-sm transition-colors hover:text-amber-400"
          style={{ color: "#8DA9C4" }}
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </button>

        {/* Product layout */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Gallery */}
          <div>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/3", boxShadow: "0 8px 32px rgba(0,0,0,0.40)" }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ background: "#134074" }}
              />
              {product.captiveBred && (
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold"
                  style={{ background: "rgba(26, 158, 92, 0.92)", color: "#fff" }}
                >
                  <Leaf size={14} />
                  Captive Bred
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all"
                  style={{
                    border: `2px solid ${i === activeImg ? "#EEB902" : "rgba(141, 169, 196, 0.20)"}`,
                    background: "#134074",
                  }}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={product.imageUrl} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#E6EDF3",
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill={s <= Math.round(product.sellerRating) ? "#EEB902" : "none"} color={s <= Math.round(product.sellerRating) ? "#EEB902" : "#8DA9C4"} />
                ))}
              </div>
              <span className="text-sm" style={{ color: "#8DA9C4" }}>
                {product.sellerRating} ({product.sellerReviews} reviews)
              </span>
            </div>

            <div className="h-px my-5" style={{ background: "rgba(141, 169, 196, 0.15)" }} />

            {/* Price */}
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "#EEB902" }}>
              ${product.price.toFixed(2)}
            </p>

            {/* Trust badges */}
            <div className="space-y-2 mt-4">
              {product.captiveBred && (
                <div className="flex items-center gap-2 text-sm" style={{ color: "#1A9E5C" }}>
                  <Leaf size={14} />
                  Captive Bred — ethically sourced
                </div>
              )}
              <div className="flex items-center gap-2 text-sm" style={{ color: "#1A9E5C" }}>
                <ShieldCheck size={14} />
                Live Arrival Guarantee
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#1A9E5C" }}>
                <ShieldCheck size={14} />
                Verified Seller — {product.seller}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(141, 169, 196, 0.10)", border: "1px solid rgba(141, 169, 196, 0.20)", color: "#8DA9C4" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="h-px my-5" style={{ background: "rgba(141, 169, 196, 0.15)" }} />

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-medium" style={{ color: "#8DA9C4" }}>Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(141, 169, 196, 0.25)", color: "#8DA9C4" }}
                >
                  <Minus size={14} />
                </button>
                <span className="text-lg font-semibold w-6 text-center" style={{ color: "#E6EDF3" }}>{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stockCount, qty + 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(141, 169, 196, 0.25)", color: "#8DA9C4" }}
                >
                  <Plus size={14} />
                </button>
              </div>
              {product.stockCount <= 5 && (
                <span className="text-xs" style={{ color: "#F59E0B" }}>Only {product.stockCount} left</span>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={handleAdd}
                className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: added ? "#1A9E5C" : "#EEB902",
                  color: added ? "#fff" : "#0B2545",
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  transform: added ? "scale(0.98)" : "scale(1)",
                }}
                disabled={!product.inStock}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => setSavedWish(!savedWish)}
                className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
                style={{
                  background: savedWish ? "rgba(238, 185, 2, 0.10)" : "transparent",
                  color: savedWish ? "#EEB902" : "#8DA9C4",
                  border: `1.5px solid ${savedWish ? "rgba(238, 185, 2, 0.35)" : "rgba(141, 169, 196, 0.25)"}`,
                }}
              >
                <Heart size={16} fill={savedWish ? "#EEB902" : "none"} />
                {savedWish ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Shipping info */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: "#8DA9C4" }}>
                <Package size={13} />
                Estimated delivery: {product.deliveryDays} business days
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#8DA9C4" }}>
                <Lock size={13} />
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8" style={{ borderColor: "rgba(141, 169, 196, 0.15)" }}>
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px"
                style={{
                  color: activeTab === tab ? "#EEB902" : "#8DA9C4",
                  borderColor: activeTab === tab ? "#EEB902" : "transparent",
                  fontFamily: "var(--font-body)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mb-12">
          {activeTab === "Description" && (
            <div className="space-y-4">
              <p style={{ color: "#C9D1D9", lineHeight: 1.8, fontFamily: "var(--font-body)" }}>{product.description}</p>
              {species && (
                <div
                  className="p-4 rounded-xl flex items-center justify-between"
                  style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.15)" }}
                >
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: "#8DA9C4" }}>SPECIES ENCYCLOPEDIA</p>
                    <p className="font-semibold text-sm" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>{species.commonName}</p>
                    <p className="italic text-xs" style={{ fontFamily: "var(--font-scientific)", color: "#8DA9C4" }}>{species.scientificName}</p>
                  </div>
                  <button
                    onClick={() => onNavigate("species", species.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                    style={{ color: "#EEB902", border: "1.5px solid rgba(238, 185, 2, 0.30)" }}
                  >
                    View Species →
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "Care Guide" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Tank Size", value: species?.habitat === "Freshwater" ? "Min. 40L" : "Min. 200L" },
                  { label: "Experience Level", value: product.tags.find(t => t.includes("Beginner")) ? "Beginner" : "Intermediate+" },
                  { label: "Water Temp", value: species?.temp || "24–27°C" },
                  { label: "Diet", value: species?.diet || "Varied" },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 rounded-xl" style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.12)" }}>
                    <p className="text-xs mb-1" style={{ color: "#8DA9C4" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "#E6EDF3" }}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl" style={{ background: "rgba(14, 165, 233, 0.08)", border: "1px solid rgba(14, 165, 233, 0.20)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "#0EA5E9" }}>Care tip</p>
                <p className="text-sm leading-relaxed" style={{ color: "#8DA9C4" }}>
                  A detailed PDF care guide will be attached to your order confirmation email. It covers acclimation protocol, feeding schedule, and compatibility notes.
                </p>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3rem", color: "#EEB902" }}>{product.sellerRating}</p>
                  <div className="flex gap-0.5 justify-center">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={14} fill="#EEB902" color="#EEB902" />)}
                  </div>
                  <p className="text-xs mt-1" style={{ color: "#8DA9C4" }}>{product.sellerReviews} reviews</p>
                </div>
                <div className="h-16 w-px" style={{ background: "rgba(141, 169, 196, 0.15)" }} />
                <div className="space-y-1.5 flex-1">
                  {[5,4,3,2,1].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="text-xs w-2" style={{ color: "#8DA9C4" }}>{n}</span>
                      <Star size={10} fill="#EEB902" color="#EEB902" />
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(141, 169, 196, 0.15)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: n === 5 ? "70%" : n === 4 ? "20%" : "5%", background: "#EEB902" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {REVIEWS.map((r, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.12)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#0B2545", color: "#EEB902" }}>
                        {r.author[0]}
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#E6EDF3" }}>{r.author}</span>
                    </div>
                    <span className="text-xs" style={{ color: "#8DA9C4" }}>{r.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={12} fill={s <= r.rating ? "#EEB902" : "none"} color={s <= r.rating ? "#EEB902" : "#8DA9C4"} />)}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#C9D1D9" }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Shipping" && (
            <div className="space-y-4">
              {[
                { icon: Truck, title: "Live Delivery", desc: "All fish ship via overnight express with thermal packaging and oxygen. Delivery window: 6am–8pm, signature required." },
                { icon: ShieldCheck, title: "Live Arrival Guarantee", desc: "If your fish doesn't arrive alive, we'll issue a full refund or replacement — no questions asked. Photo required within 2 hours of delivery." },
                { icon: Package, title: "Packaging", desc: "Triple-sealed bags, insulated foam box, heat or cold pack based on destination temperature, biodegradable packaging." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl" style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.12)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(238, 185, 2, 0.12)" }}>
                    <Icon size={18} style={{ color: "#EEB902" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#8DA9C4" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seller card */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.15)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ background: "linear-gradient(135deg, #EEB902, #F5CC40)", color: "#0B2545" }}
              >
                {product.seller[0]}
              </div>
              <div>
                <p className="font-semibold" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>{product.seller}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={12} style={{ color: "#1A9E5C" }} />
                  <span className="text-xs" style={{ color: "#1A9E5C" }}>Verified Seller</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "#8DA9C4" }}>
                  <span>★ {product.sellerRating} · {product.sellerReviews} reviews</span>
                  <span>· Ships within 24hrs</span>
                  <span>· CITES Compliant</span>
                </div>
              </div>
            </div>
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
              style={{ color: "#E6EDF3", border: "1.5px solid rgba(141, 169, 196, 0.25)" }}
            >
              View Seller Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
