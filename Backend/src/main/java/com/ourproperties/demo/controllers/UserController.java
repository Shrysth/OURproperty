package com.ourproperties.demo.controllers;

import com.ourproperties.demo.Entities.User;
import com.ourproperties.demo.Services.UserService;
import com.ourproperties.demo.config.AuthResponse;
import com.ourproperties.demo.dtos.UserDto;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Date;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        try {
            // Convert UserDto to User entity
            User user = new User();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            user.setRole(userDto.getRole());
            user.setPhoneNumber(userDto.getPhoneNumber());

            User createdUser = userService.registerUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        try {
            Optional<User> user = userService.loginUser(email, password);
            if (user.isPresent()) {
                String token = Jwts.builder()
                        .setSubject(user.get().getEmail())
                        .claim("role", user.get().getRole())
                        .claim("name", user.get().getName())
                        .claim("dashboardKey", user.get().getDashboardKey())
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
                        .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes()) // Ensure the secret is in bytes
                        .compact();

                return ResponseEntity.ok(new AuthResponse(token));
            } else {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "An error occurred during login"));
        }
    }

}
