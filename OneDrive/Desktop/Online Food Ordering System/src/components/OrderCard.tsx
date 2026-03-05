import { Order } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  PENDING: "bg-warm/15 text-warm border-warm/30",
  CONFIRMED: "bg-primary/15 text-primary border-primary/30",
  PREPARING: "bg-secondary text-secondary-foreground border-border",
  DELIVERED: "bg-success/15 text-success border-success/30",
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">{order.id}</h3>
          <p className="text-sm text-muted-foreground">{order.restaurantName}</p>
        </div>
        <Badge className={statusColors[order.status]} variant="outline">{order.status}</Badge>
      </div>
      <div className="mt-4 space-y-2">
        {order.items.map((item) => (
          <div key={item.menuItem.id} className="flex justify-between text-sm">
            <span>{item.menuItem.name} × {item.quantity}</span>
            <span className="text-muted-foreground">${(item.menuItem.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()} · {order.customerName}
        </span>
        <span className="font-display text-lg font-bold text-primary">${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderCard;
