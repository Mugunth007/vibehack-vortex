# Vortex: Next-Gen Social Engineering Platform

### What is Vortex?
**Vortex** is a cutting-edge, AI-powered social engineering platform designed for advanced cybersecurity simulations. It transcends traditional phishing tools by offering a multi-channel attack simulation ecosystem (Email, SMS, Voice) wrapped in a premium, high-performance interface.

Vortex helps red teams and security professionals assess organizational resilience against sophisticated modern threats.

### Key Features

#### 🛡️ Multi-Vector Attack Simulation
- **Phishing (Email)**: Create pixel-perfect email campaigns with dynamic templates.
- **Smishing (SMS)**: Simulate text message attacks to test mobile security awareness. (Coming Soon)
- **Vishing (Voice)**: AI-driven voice calls to simulate vishing attacks. (Coming Soon)

#### 🧠 AI-Powered Intelligence
- **Generative AI Campaigns**: Use GPT-4 to generate highly convincing email copy and landing pages instantly.
- **Dynamic Context**: Automatically adapts simulations based on user profiles and OSINT data.

#### 📊 Real-Time Analytics & Recon
- **Live Dashboard**: Visualize campaign performance, click rates, and compromised credentials in real-time with beautiful interactive charts.
- **Audience Management**: Manage thousands of targets with detailed tagging and segmentation.
- **OSINT Integration**: Automatically gather footprint data to craft hyper-targeted attacks.

#### 💎 Premium Modern UI (Aceternity)
- **Glassmorphic Design**: A stunning, dark-themed interface built with Tailwind CSS and Framer Motion.
- **Responsive & Fast**: Fully optimized for all devices with buttery smooth animations.
- **Inter Font**: Clean, professional typography for maximum readability.

## Local Development Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (Local or Atlas)
- **Git**

### Quick Start
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/cloudsecnetwork/vortex.git
    cd vortex
    ```

2.  **Start Backend**
    ```bash
    npm install
    node scripts/initRootAdmin.js # First time only
    nodemon app.js
    ```

3.  **Start Frontend**
    ```bash
    cd client
    pnpm install
    pnpm start
    ```

4.  **Access Vortex**
    - Console: `http://localhost:3000`
    - API: `http://localhost:8080`

## Environment Variables
Create a `.env` file in the root directory:
```env
DB_URL=mongodb+srv://... (or local)
SESSION_SECRET=your_secret_key
PORT=8080
```

## Security & Disclaimer
Vortex is intended for **authorized security testing and educational purposes only**. Using this tool against targets without prior mutual consent is illegal and strictly prohibited.

---
&copy; 2025 Nexus Security. Built for Red Teams.
