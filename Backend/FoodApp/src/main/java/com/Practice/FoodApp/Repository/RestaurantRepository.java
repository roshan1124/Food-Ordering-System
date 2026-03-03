package com.Practice.FoodApp.Repository;

import com.Practice.FoodApp.Entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantEntity, Long> {
    List<RestaurantEntity> findByCuisineType(String cuisineType);
    List<RestaurantEntity> findByRatingGreaterThanEqual(Double rating);
}