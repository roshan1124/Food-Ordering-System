package com.Practice.FoodApp.RestController;

import com.Practice.FoodApp.Entity.FoodEntity;
import com.Practice.FoodApp.Entity.RestaurantEntity;
import com.Practice.FoodApp.Service.RestaurantService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping
    public RestaurantEntity addRestaurant(@RequestBody RestaurantEntity restaurant) {
        return restaurantService.addRestaurant(restaurant);
    }

    @GetMapping
    public List<RestaurantEntity> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public RestaurantEntity getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id);
    }

    @GetMapping("/cuisine/{cuisineType}")
    public List<RestaurantEntity> getRestaurantsByCuisine(@PathVariable String cuisineType) {
        return restaurantService.getRestaurantsByCuisine(cuisineType);
    }

    @PutMapping("/{id}")
    public RestaurantEntity updateRestaurant(@PathVariable Long id, @RequestBody RestaurantEntity restaurant) {
        return restaurantService.updateRestaurant(id, restaurant);
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
    }

    @GetMapping("/{id}/foods")
    public List<FoodEntity> getRestaurantFoods(@PathVariable Long id) {
        return restaurantService.getRestaurantFoods(id);
    }
}