package com.Practice.FoodApp.Service.Imp;

import com.Practice.FoodApp.Entity.FoodEntity;
import com.Practice.FoodApp.Entity.RestaurantEntity;
import com.Practice.FoodApp.exception.ResourceNotFoundException;
import com.Practice.FoodApp.exception.BadRequestException;
import com.Practice.FoodApp.Repository.FoodRepository;
import com.Practice.FoodApp.Repository.RestaurantRepository;
import com.Practice.FoodApp.Service.RestaurantService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final FoodRepository foodRepository;

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository, FoodRepository foodRepository) {
        this.restaurantRepository = restaurantRepository;
        this.foodRepository = foodRepository;
    }

    @Override
    public RestaurantEntity addRestaurant(RestaurantEntity restaurant) {
        // Validate required fields
        if (!StringUtils.hasText(restaurant.getName())) {
            throw new BadRequestException("Restaurant name is required");
        }
        if (!StringUtils.hasText(restaurant.getEmail())) {
            throw new BadRequestException("Restaurant email is required");
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public List<RestaurantEntity> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public RestaurantEntity getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
    }

    @Override
    public RestaurantEntity updateRestaurant(Long id, RestaurantEntity restaurant) {
        RestaurantEntity existingRestaurant = getRestaurantById(id);

        // Update only if new values are provided
        if (StringUtils.hasText(restaurant.getName())) {
            existingRestaurant.setName(restaurant.getName());
        }
        if (StringUtils.hasText(restaurant.getDescription())) {
            existingRestaurant.setDescription(restaurant.getDescription());
        }
        if (StringUtils.hasText(restaurant.getAddress())) {
            existingRestaurant.setAddress(restaurant.getAddress());
        }
        if (StringUtils.hasText(restaurant.getPhoneNumber())) {
            existingRestaurant.setPhoneNumber(restaurant.getPhoneNumber());
        }
        if (StringUtils.hasText(restaurant.getEmail())) {
            existingRestaurant.setEmail(restaurant.getEmail());
        }
        if (StringUtils.hasText(restaurant.getCuisineType())) {
            existingRestaurant.setCuisineType(restaurant.getCuisineType());
        }
        if (StringUtils.hasText(restaurant.getOpeningHours())) {
            existingRestaurant.setOpeningHours(restaurant.getOpeningHours());
        }
        if (restaurant.getRating() != null) {
            existingRestaurant.setRating(restaurant.getRating());
        }
        if (StringUtils.hasText(restaurant.getImageUrl())) {
            existingRestaurant.setImageUrl(restaurant.getImageUrl());
        }

        return restaurantRepository.save(existingRestaurant);
    }

    @Override
    public void deleteRestaurant(Long id) {
        RestaurantEntity restaurant = getRestaurantById(id);

        // Check if restaurant has food items
        List<FoodEntity> foodItems = foodRepository.findByRestaurant(restaurant);
        if (!foodItems.isEmpty()) {
            throw new BadRequestException("Cannot delete restaurant with existing food items. Please delete food items first.");
        }

        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<RestaurantEntity> getRestaurantsByCuisine(String cuisineType) {
        if (!StringUtils.hasText(cuisineType)) {
            throw new BadRequestException("Cuisine type cannot be empty");
        }
        return restaurantRepository.findByCuisineType(cuisineType);
    }

    @Override
    public List<FoodEntity> getRestaurantFoods(Long restaurantId) {
        RestaurantEntity restaurant = getRestaurantById(restaurantId);
        return foodRepository.findByRestaurant(restaurant);
    }
}