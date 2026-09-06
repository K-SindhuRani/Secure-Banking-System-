package com.securebank.securebank.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.securebank.securebank.dto.TransferRequest;
import com.securebank.securebank.entity.Account;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.repository.AccountRepository;
import com.securebank.securebank.repository.UserRepository;

@Service
public class AccountService {

    private static final Logger logger =
            LoggerFactory.getLogger(AccountService.class);

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;

    // ==============================
    // CREATE ACCOUNT
    // ==============================

    public Account createAccount(
            Long userId,
            Account account) {

        Optional<User> optionalUser =
                userRepository.findById(userId);

        if (optionalUser.isEmpty()) {

            throw new RuntimeException(
                    "User Not Found"
            );
        }

        if (account.getBalance() == null) {
            account.setBalance(0.0);
        }

        if (account.getBalance() < 0) {
            throw new RuntimeException(
                    "Initial balance cannot be negative"
            );
        }

        account.setUser(optionalUser.get());
        account.setCreatedDate(LocalDate.now());
        account.setStatus("ACTIVE");
        account.setAccountNumber(
                generateAccountNumber()
        );

        return accountRepository.save(account);
    }

    // ==============================
    // GENERATE ACCOUNT NUMBER
    // ==============================

    private String generateAccountNumber() {

        Random random = new Random();

        String accountNumber;

        do {

            accountNumber =
                    "SB" +
                    (10000000 +
                            random.nextInt(90000000));

        } while (
                accountRepository
                        .findByAccountNumber(accountNumber)
                        .isPresent()
        );

        return accountNumber;
    }

    // ==============================
    // GET ALL ACCOUNTS
    // ==============================

    public List<Account> getAllAccounts() {

        return accountRepository.findAll();
    }

    // ==============================
    // GET ACCOUNT
    // ==============================

    public Account getAccountByNumber(
            String accountNumber) {

        return accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Account Not Found"
                        )
                );
    }

    // ==============================
    // DEPOSIT
    // ==============================

    public Account deposit(
            String accountNumber,
            Double amount) {

        validateAmount(amount);

        Account account =
                getAccountByNumber(accountNumber);

        checkAccountActive(account);

        account.setBalance(
                account.getBalance() + amount
        );

        Account updated =
                accountRepository.save(account);

        transactionService.saveTransaction(
                "DEPOSIT",
                accountNumber,
                accountNumber,
                amount,
                "SUCCESS"
        );

        return updated;
    }

    // ==============================
    // WITHDRAW
    // ==============================

    public Account withdraw(
            String accountNumber,
            Double amount) {

        validateAmount(amount);

        Account account =
                getAccountByNumber(accountNumber);

        checkAccountActive(account);

        if (account.getBalance() < amount) {

            throw new RuntimeException(
                    "Insufficient Balance"
            );
        }

        account.setBalance(
                account.getBalance() - amount
        );

        Account updated =
                accountRepository.save(account);

        transactionService.saveTransaction(
                "WITHDRAW",
                accountNumber,
                accountNumber,
                amount,
                "SUCCESS"
        );

        return updated;
    }

    // ==============================
    // TRANSFER
    // ==============================

    @Transactional
    public String transferMoney(
            TransferRequest request) {

        if (request == null) {
            throw new RuntimeException(
                    "Transfer request cannot be empty"
            );
        }

        validateAmount(request.getAmount());

        if (request.getFromAccount() == null ||
                request.getToAccount() == null) {

            throw new RuntimeException(
                    "Account numbers are required"
            );
        }

        if (request.getFromAccount()
                .equals(request.getToAccount())) {

            throw new RuntimeException(
                    "Cannot transfer to the same account"
            );
        }

        Account sender =
                getAccountByNumber(
                        request.getFromAccount()
                );

        Account receiver =
                getAccountByNumber(
                        request.getToAccount()
                );

        checkAccountActive(sender);
        checkAccountActive(receiver);

        if (sender.getBalance() <
                request.getAmount()) {

            throw new RuntimeException(
                    "Insufficient Balance"
            );
        }

        sender.setBalance(
                sender.getBalance()
                        - request.getAmount()
        );

        receiver.setBalance(
                receiver.getBalance()
                        + request.getAmount()
        );

        accountRepository.save(sender);
        accountRepository.save(receiver);

        transactionService.saveTransaction(
                "TRANSFER",
                request.getFromAccount(),
                request.getToAccount(),
                request.getAmount(),
                "SUCCESS"
        );

        return "Transfer Successful";
    }

    // ==============================
    // BALANCE
    // ==============================

    public Double getBalance(
            String accountNumber) {

        Account account =
                getAccountByNumber(accountNumber);

        return account.getBalance();
    }

    // ==============================
    // DELETE ACCOUNT
    // ==============================

    public String deleteAccount(
            String accountNumber) {

        Account account =
                getAccountByNumber(accountNumber);

        accountRepository.delete(account);

        return "Account Deleted Successfully";
    }

    // ==============================
    // VALIDATE AMOUNT
    // ==============================

    private void validateAmount(Double amount) {

        if (amount == null ||
                amount <= 0) {

            throw new RuntimeException(
                    "Amount must be greater than zero"
            );
        }
    }

    // ==============================
    // CHECK ACCOUNT STATUS
    // ==============================

    private void checkAccountActive(
            Account account) {

        if (!"ACTIVE".equalsIgnoreCase(
                account.getStatus())) {

            throw new RuntimeException(
                    "Account is blocked"
            );
        }
    }
}