package com.securebank.securebank.dto;

public class DashboardStats {

    private long totalUsers;
    private long totalAccounts;
    private long totalTransactions;

    public DashboardStats(long totalUsers,
                          long totalAccounts,
                          long totalTransactions) {

        this.totalUsers = totalUsers;
        this.totalAccounts = totalAccounts;
        this.totalTransactions = totalTransactions;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getTotalAccounts() {
        return totalAccounts;
    }

    public long getTotalTransactions() {
        return totalTransactions;
    }
}