package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
	
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Users;
import com.example.demo.repository.UsersRepository;

import java.util.Optional;


@Service
public class UsersService {

    @Autowired
    private UsersRepository userRepository;

    public void createUser(Users user) {
    	if (user.getFirstName() == null || user.getLastName() == null || user.getUsername() == null || user.getMobile() == null || user.getRole() == null || user.getPassword() == null) {
            throw new IllegalArgumentException("First name, last name, or username cannot be null");
        }
        userRepository.save(user); // No password encoding in this simplified version
    }

    public Optional<Users> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public void updateUser(Users user) {
    	userRepository.save(user);  // This will update the user with the new password
    }
    
    public Optional<Users> findById(Long id) {
        return userRepository.findById(id);
    }



    
    public Users updateAdminDetails(Users updatedData) {
        Optional<Users> existingUser = userRepository.findById(updatedData.getId());

        if (existingUser.isPresent()) {
            Users user = existingUser.get();

            
            if (updatedData.getFirstName() != null && !updatedData.getFirstName().isEmpty()) {
                user.setFirstName(updatedData.getFirstName());
            }

            
            if (updatedData.getLastName() != null && !updatedData.getLastName().isEmpty()) {
                user.setLastName(updatedData.getLastName());
            }

        
            if (updatedData.getMobile() != null && !updatedData.getMobile().isEmpty()) {
                user.setMobile(updatedData.getMobile());
            }

            return userRepository.save(user); // Save updated user details
        } else {
            throw new RuntimeException("Admin (user) not found.");
        }
    }

    
}