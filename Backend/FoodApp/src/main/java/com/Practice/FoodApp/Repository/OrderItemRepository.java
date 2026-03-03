package com.Practice.FoodApp.Repository;

import com.Practice.FoodApp.Entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
}