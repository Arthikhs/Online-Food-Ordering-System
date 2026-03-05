import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin } from "lucide-react";
import { restaurants } from "@/data/mockData";
import MenuItemCard from "@/components/MenuItemCard";
import { Button } from "@/components/ui/button";

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h2 className="font-display text-2xl font-bold">Restaurant not found</h2>
        <Link to="/"><Button variant="hero" className="mt-4">Back to Restaurants</Button></Link>
      </div>
    );
  }

  const categories = [...new Set(restaurant.menu.map((m) => m.category))];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-3 gap-1 text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
            <h1 className="font-display text-3xl font-bold text-primary-foreground">{restaurant.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-current text-warm" /> {restaurant.rating}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {restaurant.deliveryTime}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {restaurant.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-8">
        {categories.map((cat) => (
          <div key={cat} className="mb-8">
            <h2 className="font-display text-xl font-bold">{cat}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {restaurant.menu
                .filter((m) => m.category === cat)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} restaurantId={restaurant.id} restaurantName={restaurant.name} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
