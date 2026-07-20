package com.securebank.securebank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.securebank.securebank.dto.DashboardStats;
import com.securebank.securebank.entity.Account;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.repository.AccountRepository;
import com.securebank.securebank.repository.TransactionRepository;
import com.securebank.securebank.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // View All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete User
    public String deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User Not Found");
        }

        userRepository.deleteById(id);

        return "User Deleted Successfully";
    }

    // Block Account
    public String blockAccount(String accountNumber) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account Not Found"));

        account.setStatus("BLOCKED");

        accountRepository.save(account);

        return "Account Blocked Successfully";
    }

    // Unblock Account
    public String unblockAccount(String accountNumber) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account Not Found"));

        account.setStatus("ACTIVE");

        accountRepository.save(account);

        return "Account Activated Successfully";
    }

    // Dashboard Statistics
    public DashboardStats getDashboardStats() {

        return new DashboardStats(

                userRepository.count(),

                accountRepository.count(),

                transactionRepository.count()

        );
    }
}