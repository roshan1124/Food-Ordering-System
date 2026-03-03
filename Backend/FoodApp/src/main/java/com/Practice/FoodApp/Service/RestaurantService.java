package com.Practice.FoodApp.Service;

import com.Practice.FoodApp.Entity.FoodEntity;
import com.Practice.FoodApp.Entity.RestaurantEntity;
import java.util.List;

public interface RestaurantService {
    RestaurantEntity addRestaurant(RestaurantEntity restaurant);
    List<RestaurantEntity> getAllRestaurants();
    RestaurantEntity getRestaurantById(Long id);
    RestaurantEntity updateRestaurant(Long id, RestaurantEntity restaurant);
    void deleteRestaurant(Long id);
    List<RestaurantEntity> getRestaurantsByCuisine(String cuisineType);
    List<FoodEntity> getRestaurantFoods(Long restaurantId);
}