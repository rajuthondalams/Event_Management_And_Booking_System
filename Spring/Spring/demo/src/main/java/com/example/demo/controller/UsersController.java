package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Users;
import com.example.demo.services.UsersService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173") // Ensure CORS is enabled
public class UsersController {

    @Autowired
    private UsersService userService;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users loginRequest) {
        Optional<Users> user = userService.findByUsername(loginRequest.getUsername());

        if (user.isPresent() && loginRequest.getPassword().equals(user.get().getPassword())) {
            return ResponseEntity.ok(Map.of(
                    "role", user.get().getRole().toString().toLowerCase(),
                    "firstname", user.get().getFirstName(),
                    "id", user.get().getId(),
                    "success", true
            ));
        } else {
            return ResponseEntity.ok(Map.of("success", false, "message", "Invalid username or password"));
        }
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        try {
            Optional<Users> existingUser = userService.findByUsername(user.getUsername());

            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Username already exists. Please choose a different one."));
            }
            userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to register user: " + e.getMessage()));
        }
    }
 // Fetch user details by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserDetails(@PathVariable Long id) {
        Optional<Users> user = userService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> updateUserDetails(@RequestBody Users updatedUser) {
        try {
            Users updated = userService.updateAdminDetails(updatedUser);
            return ResponseEntity.ok(Map.of("success", true, "message", "User updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Failed to update user details"));
        }
    }
    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        // Validate username and current password
        Users user = userService.findByUsername(username)
                .orElse(null);

        if (user == null || !user.getPassword().equals(currentPassword)) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Invalid credentials"));
        }

        // Update the password if the current password is valid
        user.setPassword(newPassword);
        userService.updateUser(user);

        // Return success response
        return ResponseEntity.ok(Map.of("success", true, "message", "Password updated successfully"));
    }
}
