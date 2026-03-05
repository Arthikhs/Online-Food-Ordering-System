import { Search } from "lucide-react";
import { useState } from "react";
import { restaurants } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [search, setSearch] = useState("");
  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient px-4 py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container relative mx-auto text-center">
          <h1 className="font-display text-4xl font-bold md:text-6xl animate-fade-in">
            Delicious Food,<br />Delivered Fast
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg opacity-90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Order from the best local restaurants with easy online food ordering
          </p>
          <div className="relative mx-auto mt-8 max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search restaurants or cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 bg-background pl-10 text-foreground shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold">Popular Restaurants</h2>
        <p className="mt-1 text-muted-foreground">Choose from {filtered.length} restaurants near you</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((r, i) => (
            <div key={r.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No restaurants found matching "{search}"</p>
        )}
      </section>
    </div>
  );
};

export default Index;
