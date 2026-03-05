import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/data/mockData";
import { useCart } from "@/context/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

const MenuItemCard = ({ item, restaurantId, restaurantName }: MenuItemCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="flex gap-4 rounded-lg border bg-card p-4 shadow-card transition-all hover:shadow-card-hover">
      <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <h4 className="font-display font-semibold">{item.name}</h4>
            <span className="font-body text-sm font-bold text-primary">${item.price.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{item.category}</span>
          <Button size="sm" variant="hero" className="gap-1" onClick={() => addItem(item, restaurantId, restaurantName)}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
