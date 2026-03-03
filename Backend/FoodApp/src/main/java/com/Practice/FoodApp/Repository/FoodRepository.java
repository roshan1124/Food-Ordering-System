package com.Practice.FoodApp.Repository;

import com.Practice.FoodApp.Entity.FoodEntity;
import com.Practice.FoodApp.Entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<FoodEntity, Long> {
    List<FoodEntity> findByCategory(String category);
    List<FoodEntity> findByRestaurant(RestaurantEntity restaurant);
    List<FoodEntity> findByRestaurantId(Long restaurantId);
    List<FoodEntity> findByAvailableTrue();
    List<FoodEntity> findByRestaurantIdAndAvailableTrue(Long restaurantId);
}