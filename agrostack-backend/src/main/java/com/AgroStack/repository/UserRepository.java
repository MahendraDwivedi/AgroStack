package com.AgroStack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AgroStack.model.User;


public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User>  findById(Long id);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmailIgnoreCase(String email);
    
} 
