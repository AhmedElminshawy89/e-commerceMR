# MR Shop 🛒 – Full-Featured E-commerce Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.5.0-purple)](https://redux-toolkit.js.org/)
[![MUI](https://img.shields.io/badge/MUI-6.4.0-green)](https://mui.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue)](https://tailwindcss.com/)
[![i18next](https://img.shields.io/badge/i18next-24.2.1-orange)](https://www.i18next.com/)

---

## 🌟 Overview

**MR Shop** is a **modern, scalable, and fully-featured e-commerce platform** built with **React, Redux Toolkit, MUI, and TailwindCSS**.  
It includes everything a real-world e-commerce system needs: multi-language support, payment integration, sales dashboard, admin panel, and team collaboration features.

This project demonstrates the ability to build **high-quality, maintainable, and enterprise-ready frontend applications**.

---

## 🚀 Features

### User-Facing
- Multi-language support (i18n) with browser detection
- Responsive design for mobile and desktop
- Product catalog with categories and filters
- Cart management and real-time updates
- Checkout with **payment gateway integration**
- Order tracking and order history

### Admin / Dashboard
- Full CRUD for products, categories, and users
- Sales dashboard with charts, analytics, and reports
- CSV and PDF exports (`json2csv`, `jsPDF`)
- Order management for sales teams
- Role-based access and permissions

### Team Collaboration
- Sales team dashboard for order processing
- Admin can assign and track tasks
- Notifications for new orders and updates

---

## 💻 Tech Stack

**Frontend:**  
- React 18 (Functional Components & Hooks)  
- Redux Toolkit for state management  
- MUI & Ant Design for UI components  
- TailwindCSS for rapid styling  
- Swiper.js for product sliders  
- Formik + Yup for form validation  

**i18n / Multilingual:**  
- i18next + react-i18next  

**Utilities:**  
- json2csv for CSV exports  
- jsPDF for PDF invoices  
- react-loading-skeleton for better UX

**Routing & Navigation:**  
- react-router-dom v7

**Development Tools:**  
- Vite.js for fast build & dev  
- ESLint & Prettier for code quality  
- GitHub Actions (optional CI/CD)

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/AhmedElminshawy89/mr_shop.git

# Install dependencies
npm install

# Run development server
npm run dev
