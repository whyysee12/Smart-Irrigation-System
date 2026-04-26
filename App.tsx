import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import { NotificationProvider } from './contexts/NotificationContext';

const AppLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen relative">
    <div className="atmosphere"></div>
    <Navbar />
    <main className="flex-grow container mx-auto px-4 py-8 z-10">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </NotificationProvider>
  );
};

export default App;