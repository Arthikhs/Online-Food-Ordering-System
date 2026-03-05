import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Utensils, ClipboardList, Code, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { itemCount } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Restaurants", icon: Utensils },
    { to: "/orders", label: "Orders", icon: ClipboardList },
    { to: "/docs", label: "Backend Docs", icon: Code },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">FoodFlow</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Button variant={isActive(l.to) ? "secondary" : "ghost"} size="sm" className="gap-2">
                <l.icon className="h-4 w-4" />
                {l.label}
              </Button>
            </Link>
          ))}
          <Link to="/cart" className="ml-2">
            <Button variant="hero" size="sm" className="gap-2 relative">
              <ShoppingCart className="h-4 w-4" />
              Cart
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>
                <Button variant={isActive(l.to) ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </Button>
              </Link>
            ))}
            <Link to="/cart" onClick={() => setMobileOpen(false)}>
              <Button variant="hero" className="w-full gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart ({itemCount})
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
