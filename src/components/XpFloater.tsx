import { useEffect, useState } from "react";

interface FloatItem {
  id: number;
  amount: number;
}

let pushFloat: ((amount: number) => void) | null = null;

export const XP_AWARDED_EVENT = "xp-awarded";

export function showXpFloat(amount: number) {
  pushFloat?.(amount);
  // Broadcast so badges (sidebar avatar XP) can pulse.
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(XP_AWARDED_EVENT, { detail: { amount } }));
  }
}

export function XpFloater() {
  const [items, setItems] = useState<FloatItem[]>([]);

  useEffect(() => {
    pushFloat = (amount: number) => {
      const id = Date.now() + Math.random();
      setItems(prev => [...prev, { id, amount }]);
      setTimeout(() => {
        setItems(prev => prev.filter(i => i.id !== id));
      }, 1100);
    };
    return () => {
      pushFloat = null;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center">
      {items.map(item => (
        <div
          key={item.id}
          className="absolute text-4xl md:text-5xl font-heading text-primary drop-shadow-lg animate-xp-float"
        >
          +{item.amount} XP! ⭐
        </div>
      ))}
    </div>
  );
}
