package com.securebank.securebank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securebank.securebank.dto.DashboardStats;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Dashboard Stats
    @GetMapping("/dashboard")
    public DashboardStats getDashboardStats() {
        return adminService.getDashboardStats();
    }

    // View All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    // Delete User
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        return adminService.deleteUser(id);
    }

    // Block Account
    @PutMapping("/account/block/{accountNumber}")
    public String blockAccount(@PathVariable String accountNumber) {
        return adminService.blockAccount(accountNumber);
    }

    // Unblock Account
    @PutMapping("/account/unblock/{accountNumber}")
    public String unblockAccount(@PathVariable String accountNumber) {
        return adminService.unblockAccount(accountNumber);
    }

}