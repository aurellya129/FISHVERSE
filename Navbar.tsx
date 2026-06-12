import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X, Fish, ChevronDown } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onNavigate: (page: string) => void;
  currentPage: string;
  onCartOpen: () => void;
  onSearch: (q: string) => void;
}

export function Navbar({ cartCount, onNavigate, currentPage, onCartOpen, onSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(11, 37, 69, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
          borderBottom: scrolled ? "1px solid rgba(141, 169, 196, 0.15)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #EEB902, #F5CC40)" }}>
              <Fish size={18} color="#0B2545" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", color: "#E6EDF3", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.01em" }}>
              Fish<span style={{ color: "#EEB902" }}>Verse</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink label="Encyclopedia" active={currentPage === "encyclopedia"} onClick={() => onNavigate("encyclopedia")} />
            <NavLink label="Marketplace" active={currentPage === "marketplace"} onClick={() => onNavigate("marketplace")} />
            <NavLink label="Conservation" active={false} onClick={() => onNavigate("encyclopedia")} />
            <NavLink label="About" active={false} onClick={() => {}} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "#E6EDF3" }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={onCartOpen}
              className="p-2 rounded-lg transition-colors hover:bg-white/10 relative"
              style={{ color: "#E6EDF3" }}
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#EEB902", color: "#0B2545" }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="hidden lg:flex p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "#E6EDF3" }}
              aria-label="Account"
            >
              <User size={20} />
            </button>

            <button
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "#E6EDF3" }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4"
          style={{ background: "rgba(11, 37, 69, 0.92)", backdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "#8DA9C4" }}
              />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search species, habitats, or sellers…"
                className="w-full pl-12 pr-12 py-4 rounded-xl outline-none"
                style={{
                  background: "#134074",
                  border: "1.5px solid rgba(141, 169, 196, 0.30)",
                  color: "#E6EDF3",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10"
                style={{ color: "#8DA9C4" }}
              >
                <X size={18} />
              </button>
            </form>
            <p className="text-center mt-4 text-sm" style={{ color: "#8DA9C4" }}>
              Press Enter to search · Escape to close
            </p>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60]"
          style={{ background: "rgba(7, 26, 54, 0.97)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-10">
              <button onClick={() => { setMobileOpen(false); onNavigate("home"); }} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #EEB902, #F5CC40)" }}>
                  <Fish size={18} color="#0B2545" strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", color: "#E6EDF3", fontWeight: 700, fontSize: "1.2rem" }}>
                  Fish<span style={{ color: "#EEB902" }}>Verse</span>
                </span>
              </button>
              <button onClick={() => setMobileOpen(false)} style={{ color: "#8DA9C4" }}>
                <X size={24} />
              </button>
            </div>
            {[
              { label: "Home", page: "home" },
              { label: "Encyclopedia", page: "encyclopedia" },
              { label: "Marketplace", page: "marketplace" },
              { label: "Conservation", page: "encyclopedia" },
            ].map((item) => (
              <button
                key={item.page + item.label}
                onClick={() => { setMobileOpen(false); onNavigate(item.page); }}
                className="text-left py-4 border-b text-lg font-medium transition-colors hover:text-amber-400"
                style={{ color: "#E6EDF3", borderColor: "rgba(141, 169, 196, 0.12)", fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-medium transition-colors hover:opacity-100 flex items-center gap-1"
      style={{
        color: active ? "#EEB902" : "#E6EDF3",
        opacity: active ? 1 : 0.85,
        fontFamily: "var(--font-body)",
      }}
    >
      {label}
    </button>
  );
}
