package com.Practice.FoodApp.RestController;

import com.Practice.FoodApp.Entity.FoodEntity;
import com.Practice.FoodApp.Service.FoodService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    private final FoodService foodService;

    public FoodController(FoodService foodService){
        this.foodService=foodService;
    }

    @PostMapping
    public FoodEntity addFood(@RequestBody FoodEntity food) {
        return foodService.addFood(food);
    }

    @GetMapping
    public List<FoodEntity> getAllFoods() {
        return foodService.getAllFood();
    }

    @GetMapping("/{id}")
    public FoodEntity getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
    }

    // ADD THIS NEW ENDPOINT
    @GetMapping("/restaurant/{restaurantId}")
    public List<FoodEntity> getFoodsByRestaurant(@PathVariable Long restaurantId) {
        return foodService.getFoodsByRestaurant(restaurantId);
    }

    @GetMapping("/category/{category}")
    public List<FoodEntity> getFoodsByCategory(@PathVariable String category) {
        return foodService.getFoodsByCategory(category);
    }

    @PutMapping("/{id}/availability")
    public FoodEntity updateAvailability(@PathVariable Long id, @RequestParam Boolean available) {
        return foodService.updateFoodAvailability(id, available);
    }
}