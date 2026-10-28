package com.securebank.securebank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securebank.securebank.dto.LoginRequest;
import com.securebank.securebank.dto.LoginResponse;
import com.securebank.securebank.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5176",
    "https://secure-banking-system-zeta.vercel.app",
    "https://secure-banking-system-4gt8cfznm-sindhurani334-4189.vercel.app/"
})
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return authenticationService.login(
                request
        );
    }
}