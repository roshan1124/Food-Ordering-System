package com.Practice.FoodApp.RestController;

import com.Practice.FoodApp.Entity.OrderEntity;
import com.Practice.FoodApp.Entity.OrderStatus;
import com.Practice.FoodApp.Service.OrderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/{userId}")
    public OrderEntity placeOrder(@PathVariable Long userId, @RequestBody OrderEntity order) {
        return orderService.placeOrder(userId, order);
    }

    @GetMapping("/user/{userId}")
    public List<OrderEntity> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }

    @GetMapping("/{orderId}")
    public OrderEntity getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @PutMapping("/{orderId}/status")
    public OrderEntity updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderStatus status) {
        return orderService.updateOrderStatus(orderId, status);
    }

    @DeleteMapping("/{orderId}/cancel")
    public void cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
    }
}