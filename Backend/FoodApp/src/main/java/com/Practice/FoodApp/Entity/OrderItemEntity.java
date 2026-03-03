package com.Practice.FoodApp.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id")
    private FoodEntity food;

    private Integer quantity;

    private Integer price;  // Changed from int to Integer

    public OrderItemEntity(OrderEntity order, FoodEntity food, Integer quantity, Integer price) {
        this.order = order;
        this.food = food;
        this.quantity = quantity;
        this.price = price;
    }

    public OrderItemEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public FoodEntity getFood() {
        return food;
    }

    public void setFood(FoodEntity food) {
        this.food = food;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {  // Changed return type
        return price;
    }

    public void setPrice(Integer price) {  // Changed parameter type
        this.price = price;
    }

    @Override
    public String toString() {
        return "OrderItemEntity{" +
                "id=" + id +
                ", order=" + order +
                ", food=" + food +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}