package com.Practice.FoodApp.Service;

import com.Practice.FoodApp.Entity.OrderEntity;
import com.Practice.FoodApp.Entity.OrderStatus;
import java.util.List;

public interface OrderService {
    OrderEntity placeOrder(Long userId, OrderEntity order);
    List<OrderEntity> getOrdersByUser(Long userId);
    OrderEntity getOrderById(Long orderId);
    OrderEntity updateOrderStatus(Long orderId, OrderStatus status);
    void cancelOrder(Long orderId);
}