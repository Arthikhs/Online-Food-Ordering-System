import { useOrders } from "@/context/OrderContext";
import OrderCard from "@/components/OrderCard";
import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Orders = () => {
  const { orders } = useOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Your Orders</h1>
      <p className="mt-1 text-muted-foreground">{orders.length} order(s)</p>

      {orders.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <ClipboardList className="h-16 w-16 text-muted-foreground/40" />
          <h2 className="mt-4 font-display text-xl font-bold">No orders yet</h2>
          <Link to="/"><Button variant="hero" className="mt-4">Order Now</Button></Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {orders.map((order, i) => (
            <div key={order.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
