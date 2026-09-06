package com.securebank.securebank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.securebank.securebank.dto.ProfileUpdateRequest;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ==============================
    // REGISTER USER
    // ==============================

    public User registerUser(User user) {

        if (userRepository
                .findByEmail(user.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        if (user.getPhone() != null &&
                userRepository.findAll()
                        .stream()
                        .anyMatch(existing ->
                                user.getPhone()
                                        .equals(existing.getPhone()))) {

            throw new RuntimeException(
                    "Phone number already registered"
            );
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        user.setRole("CUSTOMER");
        user.setStatus("ACTIVE");

        return userRepository.save(user);
    }

    // ==============================
    // GET ALL USERS
    // ==============================

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // ==============================
    // GET USER BY ID
    // ==============================

    public User getUserById(Long id) {

        return userRepository
                .findById(id)
                .orElse(null);
    }

    // ==============================
    // DELETE USER
    // ==============================

    public String deleteUser(Long id) {

        if (!userRepository.existsById(id)) {

            return "User not found";
        }

        userRepository.deleteById(id);

        return "User deleted successfully";
    }

    // ==============================
    // GET PROFILE
    // ==============================

    public User getProfile(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found"
                        )
                );
    }

    // ==============================
    // UPDATE PROFILE
    // ==============================

    public User updateProfile(
            String email,
            ProfileUpdateRequest request) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"
                                )
                        );

        if (request.getFullName() != null &&
                !request.getFullName().isBlank()) {

            user.setFullName(
                    request.getFullName()
            );
        }

        if (request.getPhone() != null &&
                !request.getPhone().isBlank()) {

            user.setPhone(
                    request.getPhone()
            );
        }

        if (request.getAddress() != null) {

            user.setAddress(
                    request.getAddress()
            );
        }

        if (request.getCity() != null) {

            user.setCity(
                    request.getCity()
            );
        }

        if (request.getPincode() != null) {

            user.setPincode(
                    request.getPincode()
            );
        }

        if (request.getProfileImage() != null &&
                !request.getProfileImage().isBlank()) {

            user.setProfileImage(
                    request.getProfileImage()
            );
        }

        return userRepository.save(user);
    }
}