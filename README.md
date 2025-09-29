# 🚖 LoopRide

A **modern, scalable**, and fully responsive ride-sharing platform built with **React, Redux Toolkit, RTK Query, and TypeScript**. This frontend application delivers seamless experiences for **Riders**, **Drivers**, and **Admins** with intuitive UI/UX design and robust backend integration.

## 🎯 Project Overview

LoopRide is a comprehensive transportation solution that connects riders with drivers through an intelligent matching system. The platform offers:

- **Intuitive booking interface** with real-time driver matching
- **Multi-role dashboard system** tailored for different user needs
- **Secure authentication** with JWT-based session management
- **Professional UI/UX** with accessibility and mobile-first design

## 💻 Tech Stack

### Frontend Architecture
- **React 18** - Modern UI library with hooks and concurrent features
- **Redux Toolkit & RTK Query** - State management and efficient data fetching
- **TypeScript** - Type-safe development with enhanced IDE support
- **Tailwind CSS & ShadCN UI** - Utility-first styling with pre-built components
- **Axios** - HTTP client with interceptors and cookie handling
- **Recharts** - Interactive data visualization
- **React Hot Toast** - Elegant notification system

### Backend Infrastructure
- **Node.js & Express.js** - Scalable server architecture
- **MongoDB & Mongoose** - NoSQL database with ODM
- **JWT & bcrypt** - Secure authentication and encryption
- **Passport.js** - Flexible authentication middleware

## 🚀 Key Features

### 🌐 Public Landing Experience
- **Dynamic Homepage** with Hero section, service overview, and user testimonials
- **Information Hub**: About, Features, Contact, and FAQ sections
- **Responsive Design** with mobile-optimized navigation and footer

### 🔑 Authentication & Security
- **Multi-role Registration** supporting Riders, Drivers, and Admins
- **Secure Login System** with JWT tokens stored in httpOnly cookies
- **Smart Redirects** based on user roles and permissions
- **Protected Routes** ensuring authorized access only

### 👤 Rider Experience
- **Quick Booking Interface** with location search and fare estimation
- **Trip History** with detailed records and receipt downloads
- **Live Trip Tracking** showing driver location and ETA
- **Profile Center** for managing personal info and preferences

### 🚙 Driver Portal
- **Status Management** to control availability and accept rides
- **Request Queue** showing nearby ride opportunities
- **Trip Management** from pickup to drop-off with navigation support
- **Earnings Dashboard** displaying income analytics and trends
- **Vehicle Management** for updating car details and documents

### 👨‍💼 Admin Dashboard
- **User Administration** with search, filters, and account controls
- **Trip Oversight** monitoring all platform activities
- **Analytics Suite** with revenue reports and usage statistics
- **System Configuration** for platform-wide settings

### 🎨 Enhanced Features
- **Smart Navigation** adapting to user roles and permissions
- **Optimized Performance** with lazy loading and code splitting
- **Interactive Analytics** using charts and data grids
- **Safety Features** including SOS functionality and trip sharing
- **Comprehensive Error Handling** with user-friendly messages

## 🛠️ Getting Started

### Requirements
- **Node.js** v18.0.0 or later
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/jobayer-hossen/L2-Assignment-6
   cd L2-Assignment-6
   ```

2. **Install Packages**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment**
   Create `.env` file in project root:
   ```env
   VITE_API_URL=your_backend_api_url
   ```

4. **Start Development**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📐 Responsive Breakpoints

Optimized viewing experience across all devices:
- **Large Screens**: 1920px+
- **Desktop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔐 Security Measures

- **Token-based Authentication** with secure cookie storage
- **RBAC Implementation** for granular access control
- **Form Validation** preventing malicious inputs
- **HTTPS Protocol** ensuring encrypted data transfer

## ⚡ Performance Features

- **Dynamic Imports** reducing initial bundle size
- **Component Memoization** preventing unnecessary re-renders
- **Optimized Assets** with compression and lazy loading
- **Efficient State Management** minimizing re-renders

## 🤝 How to Contribute

We appreciate community contributions! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Submit a Pull Request

## 📬 Contact & Support

Need help or have questions? Reach out through:
- GitHub Issues for bug reports and feature requests
- Project discussions for general queries
- Development team for technical support

---