import { useState } from "react";
import { Heart, Star, ShieldCheck, Leaf } from "lucide-react";
import type { Product } from "./data";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    onAddToCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="group rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: "#134074",
        border: "1px solid rgba(141, 169, 196, 0.15)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.10)",
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 4px rgba(0,0,0,0.10)";
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ background: "#0B2545", filter: product.inStock ? "none" : "grayscale(50%)" }}
          loading="lazy"
        />
        {product.captiveBred && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
            style={{ background: "rgba(26, 158, 92, 0.90)", color: "#fff" }}
          >
            <Leaf size={11} />
            Captive Bred
          </div>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(7, 26, 54, 0.75)", backdropFilter: "blur(8px)", color: saved ? "#EEB902" : "#8DA9C4" }}
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          aria-label="Add to wishlist"
        >
          <Heart size={14} fill={saved ? "#EEB902" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <p className="font-semibold leading-tight text-sm" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>
            {product.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={11}
                fill={s <= Math.round(product.sellerRating) ? "#EEB902" : "none"}
                color={s <= Math.round(product.sellerRating) ? "#EEB902" : "#8DA9C4"}
              />
            ))}
            <span className="text-xs ml-1" style={{ color: "#8DA9C4" }}>
              {product.sellerRating} ({product.sellerReviews})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg" style={{ color: "#EEB902", fontFamily: "var(--font-display)" }}>
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-xs" style={{ color: "#1A9E5C" }}>
            <ShieldCheck size={12} />
            <span>Verified</span>
          </div>
        </div>

        {product.stockCount <= 5 && product.inStock && (
          <p className="text-xs" style={{ color: "#F59E0B" }}>
            Only {product.stockCount} left
          </p>
        )}

        <button
          onClick={handleAdd}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: added ? "#1A9E5C" : product.inStock ? "#EEB902" : "rgba(141, 169, 196, 0.15)",
            color: added ? "#fff" : product.inStock ? "#0B2545" : "#8DA9C4",
            fontFamily: "var(--font-display)",
            transform: added ? "scale(0.98)" : "scale(1)",
          }}
          disabled={!product.inStock}
        >
          {added ? "✓ Added" : product.inStock ? "Add to Cart" : "Notify Me"}
        </button>
      </div>
    </div>
  );
}
