package com.Practice.FoodApp.Service;

import com.Practice.FoodApp.Entity.FoodEntity;
import java.util.List;

public interface FoodService {
    FoodEntity addFood(FoodEntity food);
    List<FoodEntity> getAllFood();
    FoodEntity getFoodById(Long id);
    void deleteFood(Long id);
    List<FoodEntity> getFoodsByCategory(String category);
    List<FoodEntity> getFoodsByRestaurant(Long restaurantId);
    List<FoodEntity> getAvailableFoods();
    FoodEntity updateFoodAvailability(Long id, Boolean available);
}