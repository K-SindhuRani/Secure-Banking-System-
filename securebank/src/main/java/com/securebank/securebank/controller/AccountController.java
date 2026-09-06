package com.securebank.securebank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.securebank.securebank.dto.BalanceResponse;
import com.securebank.securebank.dto.TransferRequest;
import com.securebank.securebank.entity.Account;
import com.securebank.securebank.service.AccountService;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/user/{userId}")
    public Account createAccount(
            @PathVariable Long userId,
            @RequestBody Account account) {

        return accountService.createAccount(
                userId,
                account
        );
    }

    @GetMapping
    public List<Account> getAllAccounts() {

        return accountService.getAllAccounts();
    }

    @GetMapping("/{accountNumber}")
    public Account getAccount(
            @PathVariable String accountNumber) {

        return accountService.getAccountByNumber(
                accountNumber
        );
    }

    @GetMapping("/balance/{accountNumber}")
    public BalanceResponse getBalance(
            @PathVariable String accountNumber) {

        Double balance =
                accountService.getBalance(
                        accountNumber
                );

        return new BalanceResponse(
                accountNumber,
                balance
        );
    }

    @PutMapping(
            "/deposit/{accountNumber}/{amount}"
    )
    public Account deposit(
            @PathVariable String accountNumber,
            @PathVariable Double amount) {

        return accountService.deposit(
                accountNumber,
                amount
        );
    }

    @PutMapping(
            "/withdraw/{accountNumber}/{amount}"
    )
    public Account withdraw(
            @PathVariable String accountNumber,
            @PathVariable Double amount) {

        return accountService.withdraw(
                accountNumber,
                amount
        );
    }

    @PostMapping("/transfer")
    public String transferMoney(
            @RequestBody TransferRequest request) {

        return accountService.transferMoney(
                request
        );
    }

    @DeleteMapping("/{accountNumber}")
    public String deleteAccount(
            @PathVariable String accountNumber) {

        return accountService.deleteAccount(
                accountNumber
        );
    }
}