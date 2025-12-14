# Decoy: Security Awareness Training Platform

### What is Decoy?
**Decoy** is an AI-powered security awareness and phishing simulation platform designed to help organizations protect their employees from social engineering attacks. It provides a comprehensive suite of tools to test, train, and track employee security awareness.

### Key Features

#### 🎯 Phishing Simulation
- **Email Campaigns**: Create realistic phishing simulations with customizable templates
- **SMS Campaigns**: Test mobile security awareness (Coming Soon)
- **Voice Phishing**: AI-driven vishing simulations (Coming Soon)

#### 📊 Analytics & Reporting
- **Real-Time Dashboard**: Track campaign performance, click rates, and engagement
- **Risk Scoring**: Identify vulnerable employees and departments
- **Detailed Reports**: Generate comprehensive security awareness reports

#### 👥 Audience Management
- **Contact Management**: Organize and segment your target audiences
- **Bulk Import**: Import employee lists via CSV
- **Group Targeting**: Create custom groups for targeted campaigns

#### � Template Builder
- **HTML Templates**: Import custom email templates
- **AI Builder**: Generate templates using AI (Coming Soon)
- **Template Library**: Access pre-built phishing templates

#### ⚙️ Sender Profiles
- **SMTP Configuration**: Set up custom sender profiles
- **Domain Spoofing**: Test with realistic sender addresses
- **Delivery Tracking**: Monitor email delivery status

### Tech Stack
- **Frontend**: React, Tailwind CSS, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Design**: Inter Font, Glassmorphic UI

## Getting Started

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (Local or Atlas)
- **pnpm** (recommended)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mugunth007/vibehack-vortex.git
   cd vibehack-vortex
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd client
   pnpm install
   ```

4. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   DB_URL=mongodb://localhost:27017/decoy
   SESSION_SECRET=your_secret_key
   PORT=8080
   ```

5. **Initialize Admin User** (First time only)
   ```bash
   node scripts/initRootAdmin.js
   ```

6. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   nodemon app.js

   # Terminal 2 - Frontend
   cd client
   pnpm start
   ```

7. **Access Decoy**
   - App: `http://localhost:3000`
   - API: `http://localhost:8080`

## Project Structure
```
decoy/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── services/       # API services
├── models/                 # MongoDB models
├── routes/                 # Express API routes
├── scripts/                # Utility scripts
└── app.js                  # Express server entry
```

## Security Notice
⚠️ **Decoy is intended for authorized security testing and educational purposes only.** 

Using this tool against individuals or organizations without prior written consent is illegal and strictly prohibited. Always obtain proper authorization before conducting any security awareness testing.

---

© 2025 Decoy Security Inc. Built for Security Teams.
