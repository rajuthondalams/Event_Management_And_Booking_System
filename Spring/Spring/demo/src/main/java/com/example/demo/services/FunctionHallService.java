package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Entity.FunctionHall;
import com.example.demo.Entity.Users;
import com.example.demo.repository.FunctionHallRepository;
import com.example.demo.repository.UsersRepository;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

@Service
@Transactional
public class FunctionHallService {

    @Autowired
    private FunctionHallRepository functionHallRepository;

    @Autowired
    private UsersRepository usersRepository;

    // Get FunctionHalls based on State name
    public List<FunctionHall> getFunctionHallsByState(String stateName) {
        return functionHallRepository.findByState(stateName);
    }

    // Get details of a FunctionHall by hallId
    public FunctionHall getFunctionHallDetails(long hallId) { // Changed int to long
        return functionHallRepository.findById(hallId).orElse(null);
    }

    // Add a new FunctionHall
    public FunctionHall addFunctionHall(String stateName, String hallName, String location, long adminId) {
        Users admin = usersRepository.findById(adminId).orElse(null);
        if (admin == null) {
            throw new IllegalArgumentException("Admin not found for ID: " + adminId);
        }

        FunctionHall functionHall = new FunctionHall(hallName, location, stateName, admin);
        return functionHallRepository.save(functionHall);
    }

    // Get all function halls
    public List<FunctionHall> getAllFunctionHalls() {
        return functionHallRepository.findAll();
    }

    // Search FunctionHalls by term (hallName, location, or stateName)
    public List<Map<String, Object>> searchFunctionHalls(String searchTerm) {
        List<Map<String, Object>> results = new ArrayList<>();
        List<FunctionHall> halls = functionHallRepository.findAll();

        for (FunctionHall hall : halls) {
            if (hall.getHallName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                    hall.getLocation().toLowerCase().contains(searchTerm.toLowerCase()) ||
                    hall.getState().toLowerCase().contains(searchTerm.toLowerCase())) {
                Map<String, Object> result = new HashMap<>();
                result.put("state", hall.getState());
                result.put("hallId", hall.getHallId());
                result.put("hallName", hall.getHallName());
                result.put("location", hall.getLocation());
                result.put("admin", hall.getAdmin().getUsername());
                results.add(result);
            }
        }

        return results;
    }

    public List<FunctionHall> getFunctionHallsByAdminId(long adminId) {
        return functionHallRepository.findByAdmin_Id(adminId);
    }

    public FunctionHall saveFunctionHall(FunctionHall functionHall) {
        return functionHallRepository.save(functionHall);
    }

    public void deleteFunctionHall(long hallId) { // Changed int to long
        Optional<FunctionHall> functionHall = functionHallRepository.findById(hallId);
        if (functionHall.isPresent()) {
            functionHallRepository.delete(functionHall.get());
        } else {
            throw new RuntimeException("Function hall not found with ID: " + hallId);
        }
    }

    public FunctionHall updateFunctionHall(FunctionHall updatedData) {
        FunctionHall existingHall = functionHallRepository.findByHallId(updatedData.getHallId());

        if (existingHall != null) {
            // Update each property only if it's provided (non-null/non-empty)
            if (updatedData.getHallName() != null && !updatedData.getHallName().isEmpty()) {
                existingHall.setHallName(updatedData.getHallName());
            }

            if (updatedData.getLocation() != null && !updatedData.getLocation().isEmpty()) {
                existingHall.setLocation(updatedData.getLocation());
            }

            if (updatedData.getState() != null && !updatedData.getState().isEmpty()) {
                existingHall.setState(updatedData.getState());
            }

            return functionHallRepository.save(existingHall); // Save updated function hall
        } else {
            throw new RuntimeException("Function hall not found.");
        }
    }
}
