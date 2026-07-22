# 🏢 Finance ERP

A modern role-based Enterprise Resource Planning (ERP) system developed to simplify business operations such as customer/vendor management, inventory tracking, user management, and sales analytics.

The application follows a full-stack architecture with a **Spring Boot** backend exposing RESTful APIs and a **React.js** frontend delivering a responsive and user-friendly interface.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User Registration
- Secure Login
- Password Encryption using BCrypt
- Role-based access (Admin, Manager, Accountant)

### 📊 Dashboard
- Business overview dashboard
- Sales summary
- Category statistics
- Low stock monitoring
- System user count
- Interactive charts and analytics

### 👥 User Management
- Add new users
- Edit user details
- Delete users
- Manage user roles

### 🤝 Customer & Vendor Management
- Manage customer records
- Vendor management
- Credit limit tracking
- Outstanding payment tracking
- Search functionality

### 📦 Inventory Management
- Inventory overview
- Product management
- Category management
- Stock monitoring

### 📈 Reports & Analytics
- Sales overview
- Order status reports
- Dashboard analytics

---

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot 3.5.4
- Spring Data JPA
- Hibernate
- REST APIs

### Frontend
- React.js
- JavaScript
- CSS

### Database
- MySQL

### Tools & Libraries
- Maven
- Git & GitHub
- Postman
- BCrypt Password Encryption
- Spring Mail

---

## 📸 Screenshots

### Login

<img width="1906" height="927" alt="image" src="https://github.com/user-attachments/assets/7cd2caf9-479b-4972-991c-488aa3511a5d" />


### Registration

<img width="1917" height="931" alt="image" src="https://github.com/user-attachments/assets/be51ea06-605d-4892-9db2-78b62da28f09" />


### Dashboard
<img width="1895" height="941" alt="image" src="https://github.com/user-attachments/assets/e97525a0-5046-480f-92ef-4b023ce7bb6e" />

### Customer & Vendor Management

<img width="1900" height="940" alt="image" src="https://github.com/user-attachments/assets/f09a0690-8d40-4e7d-aeeb-f53b982b4709" />


---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/gokulmohankumar/Finance_ERP.git
```

### Backend

```bash
cd backend
```

Configure the database in `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/finance_erp
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Run the Spring Boot application.

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```
http://localhost:3000
```

---

## 📁 Project Modules

- Authentication
- Dashboard
- User Management
- Customer Management
- Vendor Management
- Inventory
- Reports

---

## 🔮 Planned Features

- Invoice Management
- Expense Management
- Payment Tracking
- Email Notifications
- Export Reports (PDF & Excel)
- JWT Authentication
- Docker Deployment
- Cloud Deployment
- Audit Logs

---

## 📌 Future Improvements

- Spring Security with JWT
- Role-based API authorization
- Global Exception Handling
- Request Validation
- Unit & Integration Testing
- API Documentation using Swagger/OpenAPI
- Docker Support
- CI/CD Pipeline
- Responsive Mobile UI

---

## 👨‍💻 Author

**Gokul Mohan Kumar**

- GitHub: https://github.com/gokulmohankumar
- LinkedIn: https://www.linkedin.com/in/mohangokul

---

## ⭐ If you like this project

Give it a ⭐ on GitHub if you found it useful.
