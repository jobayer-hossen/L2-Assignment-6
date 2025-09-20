# 🚖 Ride Management System (Frontend)

A **production-grade**, fully responsive, and role-based ride booking platform built with **React, Redux Toolkit, RTK Query, and TypeScript**. This frontend application delivers tailored experiences for **Riders**, **Drivers**, and **Admins** with professional UI/UX design and seamless integration with the backend API.

## 🔐 Test Credentials

### Admin Account
```
Email: super@gmail.com
Password: Admin@1234
```

## 📋 Project Overview

This comprehensive ride management system provides:

- **Public-facing landing experience** showcasing platform features
- **Role-based dashboard system** with customized interfaces for each user type
- **Secure JWT authentication** with cookie-based session management
- **Enterprise-grade UI/UX** with full responsiveness and accessibility compliance

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18** with React Router for single-page application routing
- **Redux Toolkit + RTK Query** for state management and API integration
- **TypeScript** for enhanced type safety and developer experience
- **Tailwind CSS + ShadCN UI** for modern styling and component library
- **Axios** for HTTP client with cookie support
- **Recharts** for data visualization and analytics
- **React Hot Toast** for user notifications

### Backend Technologies
- **Node.js + Express.js** server framework
- **MongoDB + Mongoose** for database management
- **JWT + bcrypt** for authentication and password security
- **Passport.js** for session management

## ✨ Core Features

### 🌍 Public Interface
- **Multi-section Home Page** including Hero, How It Works, Features, Testimonials, and Call-to-Action
- **Informational Pages**: About Us, Features, Contact, and FAQ
- **Responsive Navigation** with sticky header and comprehensive footer

### 🔐 Authentication System
- **Role-based Registration/Login** for Riders, Drivers, and Admins
- **JWT Cookie Authentication** with persistent session management
- **Automatic Role-based Redirects** post-authentication
- **Secure Logout** functionality

### 🧑‍🤝‍🧑 Rider Dashboard
- **Ride Booking System** with pickup and destination selection
- **Comprehensive Ride History** with advanced filtering and pagination
- **Real-time Ride Tracking** with status updates and driver information
- **Profile Management** for personal details and password updates

### 🚗 Driver Dashboard
- **Availability Toggle** for online/offline status management
- **Ride Request Management** with accept/reject functionality
- **Ride Status Updates** from acceptance to completion/cancellation
- **Earnings Analytics** with visual charts and performance metrics
- **Vehicle Profile Management** for driver and vehicle information

### 🛡️ Admin Control Panel
- **User Management System** with search, filter, block/unblock, and driver approval
- **Ride Monitoring** with comprehensive filtering and oversight tools
- **Analytics Dashboard** featuring data visualizations and insights
- **Administrative Profile Management**

### 🔧 Advanced Features
- **Role-based Navigation** with dynamic menu systems
- **Performance Optimization** through skeleton loaders and lazy loading
- **Data Visualization** with interactive charts and analytics cards
- **Emergency SOS Button** with contact and location sharing capabilities
- **Global Error Handling** with form validation and user feedback

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** version 18 or higher
- **Package Manager**: npm or yarn

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/naeemul-online/ride-sharing-frontend.git
   cd ride-sharing-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=https://ride-sharing-backend-seven.vercel.app/api/v1
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Production Build**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

The application is fully optimized for:
- **Desktop** displays (1920px and above)
- **Tablet** devices (768px - 1919px)
- **Mobile** devices (320px - 767px)

## 🔒 Security Features

- **JWT Token Management** with secure cookie storage
- **Role-based Access Control** with route protection
- **Input Validation** and sanitization
- **HTTPS Enforcement** for secure data transmission

## 📈 Performance Optimizations

- **Code Splitting** for reduced bundle sizes
- **Lazy Loading** for improved initial load times
- **Memoization** for component optimization
- **Image Optimization** for faster rendering

## 🤝 Contributing

We welcome contributions to improve the platform. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 📞 Support

For technical support or inquiries, please contact the development team or create an issue in the GitHub repository.

---
