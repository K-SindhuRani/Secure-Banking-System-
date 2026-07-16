# 🏦 SecureBank - Full Stack Banking Management System

## 📌 Project Overview

SecureBank is a full-stack banking management system developed using **Spring Boot**, **React.js**, **MySQL**, and **JWT Authentication**. The application provides secure banking operations for customers and administrators through role-based access control.

---

## 🚀 Features

### 👤 Customer

* Secure Login using JWT Authentication
* View Dashboard
* View All Bank Accounts
* Deposit Money
* Withdraw Money
* Transfer Money
* Mini Statement (Latest 5 Transactions)
* Complete Account Statement
* View Profile

### 👨‍💼 Admin

* Secure Admin Login
* Dashboard with Statistics
* View Total Users
* View Total Accounts
* View Total Transactions
* Manage Banking Data

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Bootstrap
* Bootstrap Icons
* CSS

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Maven

### Database

* MySQL

---

## 📂 Project Structure

```
SecureBank
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── securebank
│   ├── src
│   ├── pom.xml
│   └── mvnw
│
└── README.md
```

---

## 🔐 Authentication

* JWT Token Based Authentication
* Role-Based Authorization
* Admin & Customer Roles
* Protected API Endpoints

---

## 📷 Modules

* Login
* Dashboard
* Accounts
* Deposit
* Withdraw
* Transfer
* Mini Statement
* Full Statement
* Profile
* Admin Dashboard

---

## ⚙️ Installation

### Clone Repository

```bash
git clone K-SindhuRani/Secure-Banking-System-.git
```

### Backend

```bash
cd securebank
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄 Database

Create a MySQL database and update the following properties in:

```
application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/securebank
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

---

## 🎯 Future Enhancements

* Account Creation by Admin
* Loan Management
* Email Notifications
* PDF Statement Download
* Transaction Analytics
* Password Reset
* Mobile Responsive UI

---

## 👩‍💻 Developed By

**Kotti Sindhu Rani**

B.Tech – Computer Science & Engineering

Sri Venkateswara College of Engineering and Technology

Java | Spring Boot | React | MySQL
