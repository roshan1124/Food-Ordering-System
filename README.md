🍔 Food Ordering System – Full Stack Application

A full-stack Food Ordering System built using Spring Boot (Backend) and React (Frontend) with secure, database-driven authentication and role-based access control (USER / ADMIN).

This application allows users to browse food items, place orders, and manage their order history, while admins can manage menu items and users securely.

🚀 Tech Stack
🔹 Backend

Spring Boot

Spring Security

JWT Authentication

Spring Data JPA (Hibernate)

MySQL

BCrypt Password Encryption

🔹 Frontend

React.js

Axios

React Router

Context API

🔐 Security Features

Stateless authentication using JWT

Role-based access control (USER / ADMIN)

Secure password hashing with BCrypt

Protected API endpoints using Spring Security

Global exception handling with @ControllerAdvice

🗄 Database Design

Relational mapping using JPA (Hibernate):

User → Order → OrderItems

One-to-Many and Many-to-One relationships

Transaction management using @Transactional

Cascade operations for data consistency
📡 Core Features

👤 User
- Register & Login
- Browse food menu
- Add items to cart
- Place orders
- View order history

🛠 Admin
- Add food items
- Update food items
- Delete food items
- View all users
- Manage orders
