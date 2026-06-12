import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  seller: string;
  price: number;
  qty: number;
  imageUrl: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, items, onUpdateQty, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-sm flex flex-col"
        style={{
          background: "#0F2E54",
          borderLeft: "1px solid rgba(141, 169, 196, 0.15)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: open ? "0 0 80px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(141, 169, 196, 0.15)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#E6EDF3", fontWeight: 600, fontSize: "1.1rem" }}>
            Your Cart {items.length > 0 && <span style={{ color: "#8DA9C4" }}>({items.reduce((s, i) => s + i.qty, 0)})</span>}
          </h2>
          <button onClick={onClose} className="p-1 rounded transition-colors hover:bg-white/10" style={{ color: "#8DA9C4" }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(141, 169, 196, 0.10)" }}>
                <ShoppingBag size={28} style={{ color: "#8DA9C4" }} />
              </div>
              <p style={{ color: "#E6EDF3", fontFamily: "var(--font-display)", fontWeight: 600 }}>Your net is empty</p>
              <p style={{ color: "#8DA9C4", fontSize: "0.875rem" }}>The ocean is full — explore the marketplace to find something special.</p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: "rgba(141, 169, 196, 0.12)", color: "#E6EDF3", border: "1.5px solid rgba(141, 169, 196, 0.20)" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  style={{ background: "#134074" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#E6EDF3", fontFamily: "var(--font-body)" }}>{item.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8DA9C4" }}>{item.seller}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold" style={{ color: "#EEB902" }}>${(item.price * item.qty).toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => item.qty <= 1 ? onRemove(item.productId) : onUpdateQty(item.productId, item.qty - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10"
                        style={{ color: "#8DA9C4", border: "1px solid rgba(141, 169, 196, 0.25)" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center" style={{ color: "#E6EDF3" }}>{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.productId, item.qty + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10"
                        style={{ color: "#8DA9C4", border: "1px solid rgba(141, 169, 196, 0.25)" }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => onRemove(item.productId)} className="self-start p-1 hover:text-red-400 transition-colors" style={{ color: "#8DA9C4" }}>
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t space-y-4" style={{ borderColor: "rgba(141, 169, 196, 0.15)" }}>
            <div className="space-y-2">
              <div className="flex justify-between text-sm" style={{ color: "#8DA9C4" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#8DA9C4" }}>
                <span>Shipping</span>
                <span>From $12</span>
              </div>
              <div className="h-px" style={{ background: "rgba(141, 169, 196, 0.15)" }} />
              <div className="flex justify-between font-semibold" style={{ color: "#E6EDF3" }}>
                <span style={{ fontFamily: "var(--font-display)" }}>Est. Total</span>
                <span style={{ color: "#EEB902" }}>${(subtotal + 12).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
              style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)", fontSize: "0.95rem" }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg text-sm transition-colors hover:bg-white/5"
              style={{ color: "#8DA9C4", border: "1.5px solid rgba(141, 169, 196, 0.20)" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
