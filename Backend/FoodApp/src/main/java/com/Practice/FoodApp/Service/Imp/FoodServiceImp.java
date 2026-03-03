package com.Practice.FoodApp.Service.Imp;

import com.Practice.FoodApp.Entity.FoodEntity;
import com.Practice.FoodApp.Entity.RestaurantEntity;
import com.Practice.FoodApp.Repository.FoodRepository;
import com.Practice.FoodApp.Repository.RestaurantRepository;
import com.Practice.FoodApp.Service.FoodService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodServiceImp implements FoodService {
    private final FoodRepository foodRepository;
    private final RestaurantRepository restaurantRepository;

    public FoodServiceImp(FoodRepository foodRepository, RestaurantRepository restaurantRepository) {
        this.foodRepository = foodRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public FoodEntity addFood(FoodEntity food) {
        // Validate restaurant exists if restaurant ID is provided
        if (food.getRestaurant() != null && food.getRestaurant().getId() != null) {
            RestaurantEntity restaurant = restaurantRepository.findById(food.getRestaurant().getId())
                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            food.setRestaurant(restaurant);
        }
        return foodRepository.save(food);
    }

    @Override
    public List<FoodEntity> getAllFood() {
        return foodRepository.findAll();
    }

    @Override
    public FoodEntity getFoodById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
    }

    @Override
    public void deleteFood(Long id) {
        FoodEntity food = getFoodById(id);
        foodRepository.delete(food);
    }

    @Override
    public List<FoodEntity> getFoodsByCategory(String category) {
        return foodRepository.findByCategory(category);
    }

    @Override
    public List<FoodEntity> getFoodsByRestaurant(Long restaurantId) {
        RestaurantEntity restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        return foodRepository.findByRestaurant(restaurant);
    }

    @Override
    public List<FoodEntity> getAvailableFoods() {
        return foodRepository.findByAvailableTrue();
    }

    @Override
    public FoodEntity updateFoodAvailability(Long id, Boolean available) {
        FoodEntity food = getFoodById(id);
        food.setAvailable(available);
        return foodRepository.save(food);
    }
}