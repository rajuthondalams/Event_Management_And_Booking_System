package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.FunctionHall;

@Repository
public interface FunctionHallRepository extends JpaRepository<FunctionHall, Long> { // Changed Integer to Long
    List<FunctionHall> findByState(String state); // Find halls by state
    List<FunctionHall> findByAdmin_Id(long adminId); // Find halls by adminId
    
    @Query("from FunctionHall where hallId=:hallId")
    FunctionHall findByHallId(long hallId); // Changed int to long
}
