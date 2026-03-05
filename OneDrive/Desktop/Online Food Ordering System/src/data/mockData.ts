export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  address: string;
  menu: MenuItem[];
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  total: number;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "DELIVERED";
  createdAt: string;
  customerName: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    address: "123 Curry Lane, Food City",
    menu: [
      { id: "m1", name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken", price: 14.99, category: "Main Course", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop" },
      { id: "m2", name: "Garlic Naan", description: "Freshly baked flatbread with garlic butter", price: 3.99, category: "Bread", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop" },
      { id: "m3", name: "Biryani", description: "Fragrant basmati rice with spices and meat", price: 12.99, category: "Main Course", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop" },
      { id: "m4", name: "Mango Lassi", description: "Sweet yogurt drink with mango pulp", price: 4.99, category: "Drinks", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "2",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.4,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    address: "456 Cheese Ave, Food City",
    menu: [
      { id: "m5", name: "Margherita Pizza", description: "Classic tomato, mozzarella, and basil", price: 11.99, category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop" },
      { id: "m6", name: "Pasta Carbonara", description: "Creamy pasta with pancetta and parmesan", price: 13.99, category: "Pasta", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=200&fit=crop" },
      { id: "m7", name: "Tiramisu", description: "Classic Italian coffee-flavoured dessert", price: 7.99, category: "Dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "3",
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.5,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    address: "789 Noodle St, Food City",
    menu: [
      { id: "m8", name: "Kung Pao Chicken", description: "Spicy stir-fried chicken with peanuts", price: 12.99, category: "Main Course", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300&h=200&fit=crop" },
      { id: "m9", name: "Fried Rice", description: "Wok-tossed rice with vegetables and egg", price: 9.99, category: "Rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop" },
      { id: "m10", name: "Spring Rolls", description: "Crispy rolls filled with vegetables", price: 6.99, category: "Appetizer", image: "https://images.unsplash.com/photo-1548507200-a3c8cc0f5fd4?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "4",
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "35-45 min",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
    address: "101 Sashimi Blvd, Food City",
    menu: [
      { id: "m11", name: "Salmon Sashimi", description: "Fresh sliced salmon, 8 pieces", price: 16.99, category: "Sashimi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop" },
      { id: "m12", name: "California Roll", description: "Crab, avocado, and cucumber roll", price: 10.99, category: "Rolls", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&h=200&fit=crop" },
      { id: "m13", name: "Miso Soup", description: "Traditional Japanese soybean soup", price: 4.99, category: "Soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop" },
    ],
  },
];

// Simulated orders
export const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    restaurantId: "1",
    restaurantName: "Spice Garden",
    items: [
      { menuItem: restaurants[0].menu[0], quantity: 2 },
      { menuItem: restaurants[0].menu[1], quantity: 3 },
    ],
    total: 41.95,
    status: "DELIVERED",
    createdAt: "2026-03-03T14:30:00",
    customerName: "John Doe",
  },
  {
    id: "ORD-002",
    restaurantId: "2",
    restaurantName: "Pizza Palace",
    items: [
      { menuItem: restaurants[1].menu[0], quantity: 1 },
      { menuItem: restaurants[1].menu[2], quantity: 1 },
    ],
    total: 19.98,
    status: "PREPARING",
    createdAt: "2026-03-04T10:15:00",
    customerName: "Jane Smith",
  },
];
