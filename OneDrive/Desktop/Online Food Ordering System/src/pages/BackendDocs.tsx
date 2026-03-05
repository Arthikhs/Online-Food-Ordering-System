import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const CodeBlock = ({ children, title }: { children: string; title: string }) => (
  <div className="mt-4 overflow-hidden rounded-lg border">
    <div className="bg-secondary px-4 py-2 text-sm font-mono font-semibold text-secondary-foreground">{title}</div>
    <ScrollArea className="max-h-[500px]">
      <pre className="overflow-x-auto bg-muted p-4 text-sm"><code>{children}</code></pre>
    </ScrollArea>
  </div>
);

const BackendDocs = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Spring Boot Backend Documentation</h1>
      <p className="mt-2 text-muted-foreground">
        Complete Java Spring Boot backend for the Online Food Ordering System. Copy these files into your IDE to run the backend.
      </p>

      <Tabs defaultValue="structure" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="structure">Project Structure</TabsTrigger>
          <TabsTrigger value="entities">Entities</TabsTrigger>
          <TabsTrigger value="repos">Repositories</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="controllers">Controllers</TabsTrigger>
          <TabsTrigger value="exception">Exception Handler</TabsTrigger>
          <TabsTrigger value="config">Config & DB</TabsTrigger>
          <TabsTrigger value="api">API Docs</TabsTrigger>
          <TabsTrigger value="run">How to Run</TabsTrigger>
        </TabsList>

        <TabsContent value="structure">
          <h2 className="font-display text-xl font-bold mt-4">Project Folder Structure</h2>
          <CodeBlock title="Folder Structure">{`food-ordering-system/
├── pom.xml
├── src/
│   └── main/
│       ├── java/com/foodorder/
│       │   ├── FoodOrderApplication.java
│       │   ├── controller/
│       │   │   ├── RestaurantController.java
│       │   │   └── OrderController.java
│       │   ├── service/
│       │   │   ├── RestaurantService.java
│       │   │   └── OrderService.java
│       │   ├── repository/
│       │   │   ├── RestaurantRepository.java
│       │   │   └── OrderRepository.java
│       │   ├── model/
│       │   │   ├── Restaurant.java
│       │   │   ├── FoodOrder.java
│       │   │   └── OrderItem.java
│       │   └── exception/
│       │       ├── GlobalExceptionHandler.java
│       │       └── ResourceNotFoundException.java
│       └── resources/
│           └── application.properties`}</CodeBlock>
        </TabsContent>

        <TabsContent value="entities">
          <h2 className="font-display text-xl font-bold mt-4">Entity Classes</h2>

          <CodeBlock title="model/Restaurant.java">{`package com.foodorder.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String cuisine;

    private String address;

    private Double rating;

    private String deliveryTime;

    // Constructors
    public Restaurant() {}

    public Restaurant(String name, String cuisine, String address, Double rating, String deliveryTime) {
        this.name = name;
        this.cuisine = cuisine;
        this.address = address;
        this.rating = rating;
        this.deliveryTime = deliveryTime;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }
}`}</CodeBlock>

          <CodeBlock title="model/FoodOrder.java">{`package com.foodorder.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "food_orders")
public class FoodOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    @Column(nullable = false)
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum OrderStatus {
        PENDING, CONFIRMED, PREPARING, DELIVERED, CANCELLED
    }

    // Constructors
    public FoodOrder() {}

    public FoodOrder(String customerName, Restaurant restaurant, Double totalAmount) {
        this.customerName = customerName;
        this.restaurant = restaurant;
        this.totalAmount = totalAmount;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}`}</CodeBlock>

          <CodeBlock title="model/OrderItem.java">{`package com.foodorder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private FoodOrder order;

    public OrderItem() {}

    public OrderItem(String itemName, Integer quantity, Double price) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public FoodOrder getOrder() { return order; }
    public void setOrder(FoodOrder order) { this.order = order; }
}`}</CodeBlock>
        </TabsContent>

        <TabsContent value="repos">
          <h2 className="font-display text-xl font-bold mt-4">Repository Interfaces</h2>

          <CodeBlock title="repository/RestaurantRepository.java">{`package com.foodorder.repository;

import com.foodorder.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByCuisineContainingIgnoreCase(String cuisine);
    List<Restaurant> findByNameContainingIgnoreCase(String name);
}`}</CodeBlock>

          <CodeBlock title="repository/OrderRepository.java">{`package com.foodorder.repository;

import com.foodorder.model.FoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByCustomerNameContainingIgnoreCase(String customerName);
    List<FoodOrder> findByRestaurantId(Long restaurantId);
    List<FoodOrder> findByStatus(FoodOrder.OrderStatus status);
}`}</CodeBlock>
        </TabsContent>

        <TabsContent value="services">
          <h2 className="font-display text-xl font-bold mt-4">Service Layer</h2>

          <CodeBlock title="service/RestaurantService.java">{`package com.foodorder.service;

import com.foodorder.exception.ResourceNotFoundException;
import com.foodorder.model.Restaurant;
import com.foodorder.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
    }

    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Long id, Restaurant restaurantDetails) {
        Restaurant restaurant = getRestaurantById(id);
        restaurant.setName(restaurantDetails.getName());
        restaurant.setCuisine(restaurantDetails.getCuisine());
        restaurant.setAddress(restaurantDetails.getAddress());
        restaurant.setRating(restaurantDetails.getRating());
        restaurant.setDeliveryTime(restaurantDetails.getDeliveryTime());
        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long id) {
        Restaurant restaurant = getRestaurantById(id);
        restaurantRepository.delete(restaurant);
    }

    public List<Restaurant> searchByCuisine(String cuisine) {
        return restaurantRepository.findByCuisineContainingIgnoreCase(cuisine);
    }
}`}</CodeBlock>

          <CodeBlock title="service/OrderService.java">{`package com.foodorder.service;

import com.foodorder.exception.ResourceNotFoundException;
import com.foodorder.model.FoodOrder;
import com.foodorder.model.Restaurant;
import com.foodorder.repository.OrderRepository;
import com.foodorder.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<FoodOrder> getAllOrders() {
        return orderRepository.findAll();
    }

    public FoodOrder getOrderById(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    public FoodOrder placeOrder(FoodOrder order) {
        // Validate restaurant exists
        Restaurant restaurant = restaurantRepository.findById(order.getRestaurant().getId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Restaurant not found with id: " + order.getRestaurant().getId()));
        order.setRestaurant(restaurant);

        // Link order items to the order
        order.getItems().forEach(item -> item.setOrder(order));

        return orderRepository.save(order);
    }

    public FoodOrder updateOrderStatus(Long id, FoodOrder.OrderStatus status) {
        FoodOrder order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public void cancelOrder(Long id) {
        FoodOrder order = getOrderById(id);
        order.setStatus(FoodOrder.OrderStatus.CANCELLED);
        orderRepository.save(order);
    }

    public List<FoodOrder> getOrdersByCustomer(String customerName) {
        return orderRepository.findByCustomerNameContainingIgnoreCase(customerName);
    }
}`}</CodeBlock>
        </TabsContent>

        <TabsContent value="controllers">
          <h2 className="font-display text-xl font-bold mt-4">Controller Layer (REST APIs)</h2>

          <CodeBlock title="controller/RestaurantController.java">{`package com.foodorder.controller;

import com.foodorder.model.Restaurant;
import com.foodorder.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getRestaurantById(id));
    }

    @PostMapping
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
        return new ResponseEntity<>(restaurantService.addRestaurant(restaurant), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurant) {
        return ResponseEntity.ok(restaurantService.updateRestaurant(id, restaurant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.ok("Restaurant deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchByCuisine(@RequestParam String cuisine) {
        return ResponseEntity.ok(restaurantService.searchByCuisine(cuisine));
    }
}`}</CodeBlock>

          <CodeBlock title="controller/OrderController.java">{`package com.foodorder.controller;

import com.foodorder.model.FoodOrder;
import com.foodorder.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<FoodOrder>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodOrder> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<FoodOrder> placeOrder(@RequestBody FoodOrder order) {
        return new ResponseEntity<>(orderService.placeOrder(order), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<FoodOrder> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam FoodOrder.OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelOrder(@PathVariable Long id) {
        orderService.cancelOrder(id);
        return ResponseEntity.ok("Order cancelled successfully");
    }
}`}</CodeBlock>
        </TabsContent>

        <TabsContent value="exception">
          <h2 className="font-display text-xl font-bold mt-4">Global Exception Handling</h2>

          <CodeBlock title="exception/ResourceNotFoundException.java">{`package com.foodorder.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}`}</CodeBlock>

          <CodeBlock title="exception/GlobalExceptionHandler.java">{`package com.foodorder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", HttpStatus.NOT_FOUND.value());
        error.put("error", "Not Found");
        error.put("message", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.put("error", "Internal Server Error");
        error.put("message", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}`}</CodeBlock>
        </TabsContent>

        <TabsContent value="config">
          <h2 className="font-display text-xl font-bold mt-4">Configuration & Database Setup</h2>

          <CodeBlock title="application.properties">{`# Server Configuration
server.port=8080

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/food_ordering_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true`}</CodeBlock>

          <CodeBlock title="pom.xml (Maven Dependencies)">{`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.foodorder</groupId>
    <artifactId>food-ordering-system</artifactId>
    <version>1.0.0</version>
    <name>Food Ordering System</name>
    <description>Online Food Ordering System with Spring Boot</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starter Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Starter Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`}</CodeBlock>

          <CodeBlock title="MySQL Database Setup">{`-- Run these commands in MySQL Workbench or terminal

-- 1. Create the database
CREATE DATABASE food_ordering_db;

-- 2. Use the database
USE food_ordering_db;

-- 3. Tables are auto-created by Hibernate (ddl-auto=update)
--    But if you want to create them manually:

CREATE TABLE restaurants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cuisine VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    rating DOUBLE,
    delivery_time VARCHAR(50)
);

CREATE TABLE food_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    restaurant_id BIGINT NOT NULL,
    total_amount DOUBLE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    order_id BIGINT,
    FOREIGN KEY (order_id) REFERENCES food_orders(id)
);

-- 4. Insert sample data
INSERT INTO restaurants (name, cuisine, address, rating, delivery_time) VALUES
('Spice Garden', 'Indian', '123 Curry Lane', 4.6, '30-40 min'),
('Pizza Palace', 'Italian', '456 Cheese Ave', 4.4, '25-35 min'),
('Dragon Wok', 'Chinese', '789 Noodle St', 4.5, '20-30 min');`}</CodeBlock>

          <CodeBlock title="FoodOrderApplication.java (Main Class)">{`package com.foodorder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodOrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodOrderApplication.class, args);
    }
}`}</CodeBlock>
        </TabsContent>

        <TabsContent value="api">
          <h2 className="font-display text-xl font-bold mt-4">API Endpoints & Postman Examples</h2>

          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-display text-lg font-semibold">Restaurant APIs</h3>
              <div className="mt-2 overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-2 text-left">Method</th>
                      <th className="px-4 py-2 text-left">Endpoint</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-success">GET</td><td className="px-4 py-2 font-mono">/api/restaurants</td><td className="px-4 py-2">Get all restaurants</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-success">GET</td><td className="px-4 py-2 font-mono">/api/restaurants/{"{id}"}</td><td className="px-4 py-2">Get restaurant by ID</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-warm">POST</td><td className="px-4 py-2 font-mono">/api/restaurants</td><td className="px-4 py-2">Add a restaurant</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-primary">PUT</td><td className="px-4 py-2 font-mono">/api/restaurants/{"{id}"}</td><td className="px-4 py-2">Update a restaurant</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-destructive">DELETE</td><td className="px-4 py-2 font-mono">/api/restaurants/{"{id}"}</td><td className="px-4 py-2">Delete a restaurant</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold">Order APIs</h3>
              <div className="mt-2 overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-2 text-left">Method</th>
                      <th className="px-4 py-2 text-left">Endpoint</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-success">GET</td><td className="px-4 py-2 font-mono">/api/orders</td><td className="px-4 py-2">Get all orders</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-success">GET</td><td className="px-4 py-2 font-mono">/api/orders/{"{id}"}</td><td className="px-4 py-2">Get order by ID</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-warm">POST</td><td className="px-4 py-2 font-mono">/api/orders</td><td className="px-4 py-2">Place an order</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-primary">PATCH</td><td className="px-4 py-2 font-mono">/api/orders/{"{id}"}/status</td><td className="px-4 py-2">Update order status</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-mono text-destructive">DELETE</td><td className="px-4 py-2 font-mono">/api/orders/{"{id}"}</td><td className="px-4 py-2">Cancel an order</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <CodeBlock title="Postman: Add Restaurant (POST /api/restaurants)">{`{
  "name": "Taco Bell",
  "cuisine": "Mexican",
  "address": "321 Burrito Blvd",
  "rating": 4.2,
  "deliveryTime": "15-25 min"
}`}</CodeBlock>

            <CodeBlock title="Postman: Place Order (POST /api/orders)">{`{
  "customerName": "John Doe",
  "restaurant": { "id": 1 },
  "totalAmount": 29.97,
  "items": [
    {
      "itemName": "Butter Chicken",
      "quantity": 2,
      "price": 14.99
    }
  ]
}`}</CodeBlock>

            <CodeBlock title="Postman: Update Order Status (PATCH /api/orders/1/status?status=CONFIRMED)">{`// No request body needed
// Just send PATCH to: http://localhost:8080/api/orders/1/status?status=CONFIRMED
// Valid statuses: PENDING, CONFIRMED, PREPARING, DELIVERED, CANCELLED`}</CodeBlock>
          </div>
        </TabsContent>

        <TabsContent value="run">
          <h2 className="font-display text-xl font-bold mt-4">How to Run the Project</h2>
          <div className="mt-4 space-y-4">
            {[
              { step: 1, title: "Prerequisites", desc: "Install Java 17 (JDK), Maven, MySQL Server, and an IDE (IntelliJ IDEA or VS Code with Java Extension Pack)" },
              { step: 2, title: "Create MySQL Database", desc: "Open MySQL terminal and run: CREATE DATABASE food_ordering_db;" },
              { step: 3, title: "Create the Project", desc: "Go to https://start.spring.io → select Spring Boot 3.2, Java 17, Maven. Add dependencies: Spring Web, Spring Data JPA, MySQL Driver. Download and extract." },
              { step: 4, title: "Copy the Code", desc: "Create the package structure com.foodorder with sub-packages: model, repository, service, controller, exception. Copy all Java files from the tabs above." },
              { step: 5, title: "Configure Database", desc: "Edit src/main/resources/application.properties — set your MySQL username and password." },
              { step: 6, title: "Run the Application", desc: "In terminal: mvn spring-boot:run  |  Or in IntelliJ: Right-click FoodOrderApplication.java → Run" },
              { step: 7, title: "Test with Postman", desc: "Open Postman → send requests to http://localhost:8080/api/restaurants and http://localhost:8080/api/orders" },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 rounded-lg border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-gradient font-display text-lg font-bold text-primary-foreground">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-display font-semibold">{s.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendDocs;
