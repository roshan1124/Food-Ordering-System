package com.Practice.FoodApp.Service;

import com.Practice.FoodApp.Entity.UserEntity;
import com.Practice.FoodApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        UserEntity user = userOpt.get();

        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole() != null ? user.getRole().toString() : "USER")
                .build();
    }
}