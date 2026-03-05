import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { items, restaurantName, total, removeItem, updateQuantity, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    const order = placeOrder(name.trim());
    if (order) {
      toast.success(`Order ${order.id} placed successfully!`);
      navigate("/orders");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Add some delicious items from our restaurants</p>
        <Link to="/"><Button variant="hero" className="mt-6">Browse Restaurants</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Your Cart</h1>
      <p className="mt-1 text-muted-foreground">From {restaurantName}</p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.menuItem.id} className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-card">
            <img src={item.menuItem.image} alt={item.menuItem.name} className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-1">
              <h4 className="font-display font-semibold">{item.menuItem.name}</h4>
              <p className="text-sm text-muted-foreground">${item.menuItem.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeItem(item.menuItem.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout */}
      <div className="mt-8 rounded-lg border bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold">Checkout</h3>
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="mt-4" />
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="font-display text-2xl font-bold text-primary">${total.toFixed(2)}</span>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="outline" onClick={clearCart} className="flex-1">Clear Cart</Button>
          <Button variant="hero" onClick={handleOrder} className="flex-1">Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
