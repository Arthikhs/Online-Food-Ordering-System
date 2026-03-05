import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem, OrderItem } from "@/data/mockData";

interface CartContextType {
  items: OrderItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  const addItem = (item: MenuItem, restId: string, restName: string) => {
    if (restaurantId && restaurantId !== restId) {
      if (!confirm("Adding items from a different restaurant will clear your cart. Continue?")) return;
      setItems([]);
    }
    setRestaurantId(restId);
    setRestaurantName(restName);
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === item.id);
      if (existing) {
        return prev.map((i) => i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.menuItem.id !== itemId);
      if (next.length === 0) { setRestaurantId(null); setRestaurantName(null); }
      return next;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(itemId);
    setItems((prev) => prev.map((i) => i.menuItem.id === itemId ? { ...i, quantity } : i));
  };

  const clearCart = () => { setItems([]); setRestaurantId(null); setRestaurantName(null); };

  const total = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, restaurantId, restaurantName, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
