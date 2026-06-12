// MARKER-MAKE-KIT-INVOKED
// MARKER-MAKE-KIT-DISCOVERY-READ
// No @make-kits packages found in package.json — proceeding without a kit

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CartDrawer, type CartItem } from "./components/CartDrawer";
import { HomePage } from "./components/HomePage";
import { EncyclopediaPage } from "./components/EncyclopediaPage";
import { SpeciesDetailPage } from "./components/SpeciesDetailPage";
import { MarketplacePage } from "./components/MarketplacePage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { PRODUCTS_DATA } from "./components/data";

type Page =
  | { id: "home" }
  | { id: "encyclopedia" }
  | { id: "species"; speciesId: string }
  | { id: "marketplace" }
  | { id: "product"; productId: string };

export default function App() {
  const [page, setPage] = useState<Page>({ id: "home" });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigate = (pageId: string, entityId?: string) => {
    if (pageId === "home") setPage({ id: "home" });
    else if (pageId === "encyclopedia") setPage({ id: "encyclopedia" });
    else if (pageId === "marketplace") setPage({ id: "marketplace" });
    else if (pageId === "species" && entityId) setPage({ id: "species", speciesId: entityId });
    else if (pageId === "product" && entityId) setPage({ id: "product", productId: entityId });
  };

  const addToCart = (productId: string) => {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => i.productId === productId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [
        ...prev,
        {
          id: `cart-${productId}-${Date.now()}`,
          productId,
          name: product.name,
          seller: product.seller,
          price: product.price,
          qty: 1,
          imageUrl: product.imageUrl,
        },
      ];
    });
  };

  const updateQty = (productId: string, qty: number) => {
    setCartItems((prev) => prev.map((i) => i.productId === productId ? { ...i, qty } : i));
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const currentPageId = page.id;

  return (
    <div style={{ background: "#0B2545", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <Navbar
        cartCount={cartCount}
        onNavigate={navigate}
        currentPage={currentPageId}
        onCartOpen={() => setCartOpen(true)}
        onSearch={() => navigate("encyclopedia")}
      />

      <main
        style={{
          animation: "fadeSlideIn 0.18s ease-out forwards",
        }}
        key={JSON.stringify(page)}
      >
        {page.id === "home" && (
          <HomePage onNavigate={navigate} onAddToCart={addToCart} />
        )}
        {page.id === "encyclopedia" && (
          <EncyclopediaPage onNavigate={navigate} />
        )}
        {page.id === "species" && (
          <SpeciesDetailPage
            speciesId={page.speciesId}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        )}
        {page.id === "marketplace" && (
          <MarketplacePage onNavigate={navigate} onAddToCart={addToCart} />
        )}
        {page.id === "product" && (
          <ProductDetailPage
            productId={page.productId}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false);
          alert("Checkout flow — Stripe integration would go here.");
        }}
      />

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(141, 169, 196, 0.20) transparent;
        }

        *::-webkit-scrollbar {
          width: 4px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background: rgba(141, 169, 196, 0.20);
          border-radius: 4px;
        }

        :root {
          --font-display: 'Poppins', 'Inter', system-ui, sans-serif;
          --font-body: 'Inter', 'Poppins', system-ui, sans-serif;
          --font-scientific: 'EB Garamond', 'Georgia', serif;
        }
      `}</style>
    </div>
  );
}
