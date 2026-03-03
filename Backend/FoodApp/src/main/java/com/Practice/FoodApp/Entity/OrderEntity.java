package com.Practice.FoodApp.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private Integer totalAmount;  // Changed from int to Integer

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItems;

    public OrderEntity(UserEntity user, Integer totalAmount, OrderStatus status, List<OrderItemEntity> orderItems) {
        this.user = user;
        this.totalAmount = totalAmount;
        this.status = status;
        this.orderItems = orderItems;
    }

    public OrderEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Integer getTotalAmount() {  // Changed return type
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {  // Changed parameter type
        this.totalAmount = totalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public List<OrderItemEntity> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemEntity> orderItems) {
        this.orderItems = orderItems;
    }

    @Override
    public String toString() {
        return "OrderEntity{" +
                "id=" + id +
                ", user=" + user +
                ", totalAmount=" + totalAmount +
                ", status=" + status +
                ", orderItems=" + orderItems +
                '}';
    }
}