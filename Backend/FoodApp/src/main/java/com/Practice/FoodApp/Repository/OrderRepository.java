package com.Practice.FoodApp.Repository;

import com.Practice.FoodApp.Entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByUserId(Long userId);
}