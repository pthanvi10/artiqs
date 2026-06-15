# 🎨 Artiqs - AI Image Generation SaaS

Artiqs is a full-stack, credit-based Software-as-a-Service (SaaS) application that transforms text prompts into high-quality artwork using cutting-edge AI. 

Built entirely on the MERN stack (MongoDB, Express, React, Node.js), it includes a complete authentication system, dynamic credit tracking, and a stunning UI built with Tailwind CSS v4.

## ✨ Features

* **Text-to-Image AI:** Seamless integration with the Clipdrop API for rapid, high-quality image generation.
* **Credit-Based System:** Users receive 5 free credits upon registration, with real-time deduction upon image generation.
* **Secure Authentication:** Complete JWT (JSON Web Token) implementation with password hashing (bcryptjs).
* **Modern UI/UX:** Responsive, dark-themed interface built natively with Vite and Tailwind CSS v4.
* **Monetization Ready:** Built-in mock payment architecture ready to be swapped with Razorpay or Stripe for purchasing credit bundles.
* **State Management:** Centralized React Context API for global user state and secure API routing.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS v4
* Axios (HTTP Client)
* React Router DOM

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* Clipdrop API (AI Engine)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
* Node.js (v18 or higher)
* A MongoDB Atlas Database URL
* A free Clipdrop API Key

### Installation

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/artiqs.git](https://github.com/YOUR_USERNAME/artiqs.git)
cd artiqs