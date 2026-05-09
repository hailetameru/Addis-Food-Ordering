/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';
import { useApp } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { isCartOpen, setIsCartOpen, isAuthOpen, setIsAuthOpen, isAdminLoginOpen, setIsAdminLoginOpen, isAdminView } = useApp();

  if (isAdminView) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-cotton-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
      </main>
      <Footer />
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <AdminLoginModal isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} />
    </div>
  );
}
