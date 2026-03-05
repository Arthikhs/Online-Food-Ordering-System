import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Restaurant } from "@/data/mockData";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-md bg-card/90 px-2 py-1 text-xs font-medium backdrop-blur-sm">
            {restaurant.cuisine}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold">{restaurant.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{restaurant.address}</p>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 font-medium text-warm">
              <Star className="h-4 w-4 fill-current" />
              {restaurant.rating}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {restaurant.deliveryTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
