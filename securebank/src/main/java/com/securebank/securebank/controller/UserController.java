package com.securebank.securebank.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.securebank.securebank.dto.ProfileUpdateRequest;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class UserController {

    @Autowired
    private UserService userService;

    // ==============================
    // REGISTER
    // ==============================

    @PostMapping
    public User registerUser(
            @Valid @RequestBody User user) {

        return userService.registerUser(user);
    }

    // ==============================
    // GET ALL USERS
    // ==============================

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }

    // ==============================
    // GET USER BY ID
    // ==============================

    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id);
    }

    // ==============================
    // DELETE USER
    // ==============================

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        return userService.deleteUser(id);
    }

    // ==============================
    // GET LOGGED-IN PROFILE
    // ==============================

    @GetMapping("/profile")
    public User getProfile(
            Principal principal) {

        return userService.getProfile(
                principal.getName()
        );
    }

    // ==============================
    // UPDATE PROFILE
    // ==============================

    @PutMapping("/profile")
    public User updateProfile(
            Principal principal,
            @RequestBody ProfileUpdateRequest request) {

        return userService.updateProfile(
                principal.getName(),
                request
        );
    }
}