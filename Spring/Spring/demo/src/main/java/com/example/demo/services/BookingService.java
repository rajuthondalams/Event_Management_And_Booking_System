package com.example.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Booking;
import com.example.demo.Entity.FunctionHall;
import com.example.demo.Entity.Users;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.FunctionHallRepository;
import com.example.demo.repository.UsersRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FunctionHallRepository functionHallRepository;

    @Autowired
    private UsersRepository usersRepository;
    
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId); 
    }

    public Booking createBooking(Booking booking) {
        if (booking.getFunctionHall() == null || booking.getFunctionHall().getHallId() == 0) {
            throw new RuntimeException("Invalid Function Hall ID: " + (booking.getFunctionHall() == null ? "null" : booking.getFunctionHall().getHallId()));
        }
        
        if (booking.getUser() == null || booking.getUser().getId() == 0) {
            throw new RuntimeException("Invalid User ID: " + (booking.getUser() == null ? "null" : booking.getUser().getId()));
        }

        // Fetch Function Hall
        FunctionHall functionHall = functionHallRepository.findById(booking.getFunctionHall().getHallId())
            .orElseThrow(() -> new RuntimeException("Function Hall not found with ID: " + booking.getFunctionHall().getHallId()));

        // Fetch User details
        Users user = usersRepository.findById(booking.getUser().getId())
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + booking.getUser().getId()));

        booking.setFunctionHall(functionHall);
        booking.setUser(user); // Ensure the complete user object is set

        return bookingRepository.save(booking);
    }
}
