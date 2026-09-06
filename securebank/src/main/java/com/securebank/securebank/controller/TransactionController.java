package com.securebank.securebank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securebank.securebank.entity.Transaction;
import com.securebank.securebank.service.TransactionService;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public List<Transaction>
    getAllTransactions() {

        return transactionService
                .getAllTransactions();
    }

    @GetMapping("/{accountNumber}")
    public List<Transaction>
    getTransactions(
            @PathVariable String accountNumber) {

        return transactionService
                .getTransactions(accountNumber);
    }

    @GetMapping(
            "/mini-statement/{accountNumber}"
    )
    public List<Transaction>
    getMiniStatement(
            @PathVariable String accountNumber) {

        return transactionService
                .getMiniStatement(accountNumber);
    }
}