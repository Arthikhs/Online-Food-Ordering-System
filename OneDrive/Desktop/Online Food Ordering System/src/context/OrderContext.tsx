import React, { createContext, useContext, useState, ReactNode } from "react";
import { Order, sampleOrders } from "@/data/mockData";
import { useCart } from "./CartContext";

interface OrderContextType {
  orders: Order[];
  placeOrder: (customerName: string) => Order | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const { items, restaurantId, restaurantName, total, clearCart } = useCart();

  const placeOrder = (customerName: string): Order | null => {
    if (items.length === 0 || !restaurantId || !restaurantName) return null;
    const order: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      restaurantId,
      restaurantName,
      items: [...items],
      total,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      customerName,
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
