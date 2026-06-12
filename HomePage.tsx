import { useState, useEffect } from "react";
import { Search, ArrowRight, Waves, Shield, Leaf, Globe } from "lucide-react";
import { SpeciesCard } from "./SpeciesCard";
import { SPECIES_DATA } from "./data";

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: (productId: string) => void;
}

const HABITAT_FILTERS = [
  { label: "Coral Reef", icon: "🪸" },
  { label: "Deep Sea", icon: "🦑" },
  { label: "Freshwater", icon: "🐟" },
  { label: "Rare & Exotic", icon: "✨" },
];

const CONSERVATION_STATS = [
  { value: "37%", label: "of ornamental species are under pressure", icon: Leaf },
  { value: "34,000+", label: "fish species documented worldwide", icon: Globe },
  { value: "1,600+", label: "marine species threatened with extinction", icon: Shield },
];

export function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) onNavigate("encyclopedia");
  };

  return (
    <div style={{ background: "#0B2545", minHeight: "100vh" }}>
      {/* HERO */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 600 }}>
        {/* Background image with Ken Burns */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1637308107894-0971cb8622ed?w=1920&h=1080&fit=crop&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "kenBurns 12s ease-in-out infinite alternate",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(11,37,69,0.3) 0%, rgba(11,37,69,0.6) 50%, rgba(11,37,69,0.95) 100%)" }}
        />

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase"
            style={{ background: "rgba(238, 185, 2, 0.15)", border: "1px solid rgba(238, 185, 2, 0.30)", color: "#EEB902" }}
          >
            <Waves size={12} />
            The World's First Premium Digital Ocean
          </div>

          <h1
            className="max-w-4xl mx-auto"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "#E6EDF3",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Discover the World{" "}
            <span style={{ color: "#EEB902" }}>Beneath</span>{" "}
            the Surface
          </h1>

          <p
            className="mt-5 max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#8DA9C4",
              lineHeight: 1.7,
            }}
          >
            Encyclopedic depth. Trusted commerce. 34,000+ species awaiting discovery.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-xl mt-8"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "scale(1)" : "scale(0.98)",
              transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
            }}
          >
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2"
              style={{ color: "#8DA9C4" }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search species, habitats, or sellers…"
              className="w-full pl-14 pr-36 py-4 rounded-xl outline-none"
              style={{
                background: "rgba(19, 64, 116, 0.85)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid rgba(141, 169, 196, 0.30)",
                color: "#E6EDF3",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
              }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg font-semibold text-sm transition-all hover:brightness-110"
              style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)" }}
            >
              Search
            </button>
          </form>

          {/* Habitat quick filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {HABITAT_FILTERS.map((h) => (
              <button
                key={h.label}
                onClick={() => onNavigate("encyclopedia")}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: "rgba(19, 64, 116, 0.70)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(141, 169, 196, 0.25)",
                  color: "#E6EDF3",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>{h.icon}</span>
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(141, 169, 196, 0.40)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#EEB902" }} />
          </div>
        </div>
      </section>

      {/* FEATURED SPECIES */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#EEB902" }}>Encyclopedia</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#E6EDF3" }}>
                Featured Species
              </h2>
            </div>
            <button
              onClick={() => onNavigate("encyclopedia")}
              className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#8DA9C4" }}
            >
              View all species <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SPECIES_DATA.slice(0, 4).map((species) => (
              <SpeciesCard
                key={species.id}
                species={species}
                onClick={() => onNavigate("species", species.id)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:hidden">
            <button
              onClick={() => onNavigate("encyclopedia")}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "#8DA9C4" }}
            >
              View all species <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* CONSERVATION SPOTLIGHT */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "#071A36" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-wider uppercase" style={{ background: "rgba(26, 158, 92, 0.15)", border: "1px solid rgba(26, 158, 92, 0.30)", color: "#1A9E5C" }}>
                <Leaf size={12} />
                Conservation Center
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#E6EDF3", lineHeight: 1.15 }}>
                Why It Matters
              </h2>
              <p className="mt-4 leading-relaxed" style={{ color: "#8DA9C4", fontFamily: "var(--font-body)", fontSize: "1rem" }}>
                37% of ornamental fish species face pressure from habitat loss, climate change, and overcollection. Buying captive-bred fish, understanding IUCN status, and supporting verified sellers makes a measurable difference.
              </p>
              <button
                onClick={() => onNavigate("encyclopedia")}
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:brightness-110 hover:scale-[1.02]"
                style={{ background: "#1A9E5C", color: "#fff", fontFamily: "var(--font-display)" }}
              >
                Explore Conservation Data <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
              {CONSERVATION_STATS.map(({ value, label, icon: Icon }) => (
                <div
                  key={value}
                  className="flex items-center gap-4 p-5 rounded-xl"
                  style={{ background: "#0F2E54", border: "1px solid rgba(141, 169, 196, 0.12)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(26, 158, 92, 0.15)" }}>
                    <Icon size={22} style={{ color: "#1A9E5C" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "#EEB902" }}>{value}</p>
                    <p style={{ color: "#8DA9C4", fontSize: "0.8rem", lineHeight: 1.5 }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING THIS WEEK */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#EEB902" }}>This Week</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#E6EDF3" }}>
              Trending in the Encyclopedia
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPECIES_DATA.slice(1, 4).map((species) => (
              <SpeciesCard
                key={species.id}
                species={species}
                onClick={() => onNavigate("species", species.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE PROMO */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "linear-gradient(135deg, #0B2545 0%, #134074 50%, #0B2545 100%)" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-wider uppercase" style={{ background: "rgba(238, 185, 2, 0.15)", border: "1px solid rgba(238, 185, 2, 0.30)", color: "#EEB902" }}>
                🏆 Verified Sellers Only
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#E6EDF3", lineHeight: 1.15 }}>
                Shop Verified Ornamental Fish
              </h2>
              <p className="mt-4" style={{ color: "#8DA9C4", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
                Every seller is verified. Every live arrival is guaranteed. Browse captive-bred species from trusted breeders worldwide.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {["✅ Live Arrival Guarantee", "🌿 Captive Bred Options", "📦 Tracked Shipping"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: "rgba(141, 169, 196, 0.10)", border: "1px solid rgba(141, 169, 196, 0.20)", color: "#E6EDF3" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onNavigate("marketplace")}
                className="mt-8 flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:brightness-110 hover:scale-[1.02]"
                style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)", fontSize: "1rem" }}
              >
                Browse Marketplace <ArrowRight size={18} />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
              <img
                src="https://images.unsplash.com/photo-1718632286039-df9727a7816e?w=800&h=600&fit=crop&auto=format"
                alt="A large aquarium filled with colorful tropical fish"
                className="w-full h-full object-cover"
                style={{ background: "#0B2545" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "#071A36" }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#EEB902" }}>Stay Curious</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.75rem", color: "#E6EDF3" }}>
            New Species. Every Week.
          </h2>
          <p className="mt-3 text-sm" style={{ color: "#8DA9C4", lineHeight: 1.7 }}>
            Get the FishVerse weekly digest — new encyclopedia entries, conservation updates, and marketplace drops.
          </p>
          <form
            className="flex gap-3 mt-7"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl outline-none text-sm"
              style={{
                background: "#0F2E54",
                border: "1.5px solid rgba(141, 169, 196, 0.20)",
                color: "#E6EDF3",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 whitespace-nowrap"
              style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)" }}
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs" style={{ color: "#6B8BAD" }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 lg:px-10 border-t" style={{ borderColor: "rgba(141, 169, 196, 0.12)", background: "#0B2545" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #EEB902, #F5CC40)" }}>
                  <span style={{ fontSize: "0.8rem" }}>🐟</span>
                </div>
                <span style={{ fontFamily: "var(--font-display)", color: "#E6EDF3", fontWeight: 700 }}>
                  Fish<span style={{ color: "#EEB902" }}>Verse</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#6B8BAD" }}>
                The world's first premium digital ocean. Encyclopedic depth meets trusted commerce.
              </p>
            </div>
            {[
              { title: "Encyclopedia", links: ["Browse All", "By Habitat", "By Status", "Conservation"] },
              { title: "Marketplace", links: ["All Listings", "Reef Fish", "Freshwater", "Verified Sellers"] },
              { title: "Company", links: ["About Us", "For Businesses", "Help Center", "Privacy Policy"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-xs font-semibold tracking-wider uppercase mb-4" style={{ color: "#8DA9C4" }}>{title}</p>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <button className="text-xs transition-colors hover:text-amber-400" style={{ color: "#6B8BAD" }}>{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(141, 169, 196, 0.10)" }}>
            <p className="text-xs" style={{ color: "#6B8BAD" }}>© 2026 FishVerse. All rights reserved.</p>
            <p className="text-xs" style={{ color: "#6B8BAD" }}>Built with care for the ocean.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
