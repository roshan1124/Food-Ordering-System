package com.Practice.FoodApp.Service.Imp;

import com.Practice.FoodApp.Entity.*;
import com.Practice.FoodApp.exception.ResourceNotFoundException;
import com.Practice.FoodApp.exception.BadRequestException;
import com.Practice.FoodApp.Repository.FoodRepository;
import com.Practice.FoodApp.Repository.OrderRepository;
import com.Practice.FoodApp.Repository.UserRepository;
import com.Practice.FoodApp.Service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class OrderServiceImp implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;

    public OrderServiceImp(OrderRepository orderRepository,
                           UserRepository userRepository,
                           FoodRepository foodRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
    }

    @Override
    @Transactional
    public OrderEntity placeOrder(Long userId, OrderEntity order) {
        // Validate user
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Validate order items
        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            throw new BadRequestException("Order must contain at least one item");
        }

        // Attach user
        order.setUser(user);

        // Calculate total amount and validate food items
        int totalAmount = 0;
        for (OrderItemEntity item : order.getOrderItems()) {
            // Validate food exists
            if (item.getFood() == null || item.getFood().getId() == null) {
                throw new BadRequestException("Food item ID is required for each order item");
            }

            FoodEntity food = foodRepository.findById(item.getFood().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + item.getFood().getId()));

            // Check if food is available
            if (!food.getAvailable()) {
                throw new BadRequestException("Food item not available: " + food.getName());
            }

            // Validate quantity
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new BadRequestException("Quantity must be greater than 0 for item: " + food.getName());
            }

            // Set the actual food entity
            item.setFood(food);

            // Set price from food entity
            item.setPrice(food.getPrice());

            item.setOrder(order);
            totalAmount += item.getPrice() * item.getQuantity();
        }

        // Set total amount and status
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PLACED);

        // Save
        return orderRepository.save(order);
    }

    @Override
    public List<OrderEntity> getOrdersByUser(Long userId) {
        // Verify user exists
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return orderRepository.findByUserId(userId);
    }

    @Override
    public OrderEntity getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }

    @Override
    @Transactional
    public OrderEntity updateOrderStatus(Long orderId, OrderStatus status) {
        OrderEntity order = getOrderById(orderId);

        // Validate status transition
        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("Cannot update status of delivered order");
        }
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Cannot update status of cancelled order");
        }

        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public void cancelOrder(Long orderId) {
        OrderEntity order = getOrderById(orderId);

        // Check if order can be cancelled
        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("Cannot cancel delivered order");
        }
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order is already cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}