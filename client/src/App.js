import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
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

import NotFoundPage from './pages/NotFound';

const THEME = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 12,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>


    </ThemeProvider>
  );
}

export default App;
