import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import './App.css';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MSPortal from './pages/MSPortal';
import Dashboard from './pages/Dashboard';

import Audience from './pages/Audience';
import CreateAudience from './pages/Audience/CreateAudience';
import AudienceDetail from './pages/Audience/AudienceDetail';

import SenderProfile from './pages/SenderProfile';
import CreateSenderProfile from './pages/SenderProfile/CreateSenderProfile';

import Templates from './pages/Templates';

import Campaign from './pages/Campaign';
import StartCampaign from './pages/Campaign/StartCampaign';
import CampaignDetail from './pages/Campaign/CampaignDetail';

import Training from './pages/Training';
import Reports from './pages/Reports';

import NotFoundPage from './pages/NotFound';

const THEME = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06b6d4', // cyan-500
      light: '#22d3ee',
      dark: '#0891b2',
    },
    secondary: {
      main: '#8b5cf6', // purple-500
    },
    background: {
      default: '#020617', // slate-950
      paper: '#0f172a', // slate-900
    },
    text: {
      primary: '#f8fafc', // slate-50
      secondary: '#94a3b8', // slate-400
    },
    divider: '#1e293b', // slate-800
    error: {
      main: '#f43f5e', // rose-500
    },
    success: {
      main: '#10b981', // emerald-500
    },
    warning: {
      main: '#f59e0b', // amber-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Montserrat", sans-serif',
    fontSize: 13,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f172a',
          borderRadius: '16px',
          border: '1px solid #1e293b',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          boxShadow: '0 4px 14px 0 rgba(6, 182, 212, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)',
            boxShadow: '0 6px 20px 0 rgba(6, 182, 212, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f172a',
          backgroundImage: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            '& fieldset': {
              borderColor: '#1e293b',
            },
            '&:hover fieldset': {
              borderColor: '#334155',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#06b6d4',
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/console" element={<Login />} />
        <Route path="/account/signin" element={<MSPortal />} />

        <Route path="/console/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />

        <Route path="/console/audience" element={<ProtectedRoute><Layout><Audience /></Layout></ProtectedRoute>} />
        <Route path="/console/audience/create" element={<ProtectedRoute><Layout><CreateAudience /></Layout></ProtectedRoute>} />
        <Route path="/console/audience/:id" element={<ProtectedRoute><Layout><AudienceDetail /></Layout></ProtectedRoute>} />

        <Route path="/console/sender-profile" element={<ProtectedRoute><Layout><SenderProfile /></Layout></ProtectedRoute>} />
        <Route path="/console/sender-profile/create" element={<ProtectedRoute><Layout><CreateSenderProfile /></Layout></ProtectedRoute>} />

        <Route path="/console/templates" element={<ProtectedRoute><Layout><Templates /></Layout></ProtectedRoute>} />

        <Route path="/console/campaign" element={<ProtectedRoute><Layout><Campaign /></Layout></ProtectedRoute>} />
        <Route path="/console/campaign/create" element={<ProtectedRoute><Layout><StartCampaign /></Layout></ProtectedRoute>} />
        <Route path="/console/campaign/:id" element={<ProtectedRoute><Layout><CampaignDetail /></Layout></ProtectedRoute>} />

        <Route path="/console/training" element={<ProtectedRoute><Layout><Training /></Layout></ProtectedRoute>} />
        <Route path="/console/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Chat Widget */}
      <ChatWidget />

    </ThemeProvider>
  );
}

export default App;
