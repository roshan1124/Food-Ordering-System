package com.Practice.FoodApp.Service;

import com.Practice.FoodApp.Entity.UserEntity;
import java.util.Optional;

public interface UserService {
    UserEntity registerUser(UserEntity user);
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> login(String email, String password);
    Optional<UserEntity> getUserById(Long id);
    boolean checkPassword(String rawPassword, String encodedPassword);
}