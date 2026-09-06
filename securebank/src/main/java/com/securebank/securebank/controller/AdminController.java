package com.securebank.securebank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.securebank.securebank.dto.DashboardStats;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public DashboardStats getDashboardStats() {

        return adminService.getDashboardStats();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {

        return adminService.getAllUsers();
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        return adminService.deleteUser(id);
    }

    @PutMapping(
            "/account/block/{accountNumber}"
    )
    public String blockAccount(
            @PathVariable String accountNumber) {

        return adminService.blockAccount(
                accountNumber
        );
    }

    @PutMapping(
            "/account/unblock/{accountNumber}"
    )
    public String unblockAccount(
            @PathVariable String accountNumber) {

        return adminService.unblockAccount(
                accountNumber
        );
    }
}