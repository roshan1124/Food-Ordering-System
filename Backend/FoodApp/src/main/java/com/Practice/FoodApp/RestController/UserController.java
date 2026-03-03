package com.Practice.FoodApp.RestController;

import com.Practice.FoodApp.Entity.UserEntity;
import com.Practice.FoodApp.Service.UserService;
import com.Practice.FoodApp.dto.LoginRequest;
import com.Practice.FoodApp.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public String test() {
        return "AuthController is working!";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity user) {
        try {
            System.out.println("========== REGISTER REQUEST ==========");
            System.out.println("Email: " + user.getEmail());
            System.out.println("Name: " + user.getName());

            // Check if user already exists
            Optional<UserEntity> existingUserOpt = userService.findByEmail(user.getEmail());
            if (existingUserOpt.isPresent()) {
                return ResponseEntity.status(400).body("Email already registered");
            }

            UserEntity savedUser = userService.registerUser(user);

            System.out.println("User registered successfully with ID: " + savedUser.getId());
            System.out.println("======================================");

            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error registering user: " + e.getMessage());
            return ResponseEntity.status(500).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("========== LOGIN REQUEST ==========");
            System.out.println("Email: " + loginRequest.getEmail());

            Optional<UserEntity> userOpt = userService.login(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );

            if (userOpt.isPresent()) {
                UserEntity user = userOpt.get();
                System.out.println("Login successful for user: " + user.getName());

                LoginResponse response = new LoginResponse(
                        "Login successful",
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole() != null ? user.getRole().toString() : "USER"
                );

                return ResponseEntity.ok(response);
            } else {
                System.out.println("Login failed: Invalid credentials");
                return ResponseEntity.status(401).body("Invalid email or password");
            }
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            Optional<UserEntity> userOpt = userService.getUserById(id);
            if (userOpt.isPresent()) {
                return ResponseEntity.ok(userOpt.get());
            } else {
                return ResponseEntity.status(404).body("User not found");
            }
        } catch (Exception e) {
            System.err.println("Error fetching user: " + e.getMessage());
            return ResponseEntity.status(500).body("Error fetching user");
        }
    }
}