import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Shield, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminLoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { t, setIsAdminView } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo security: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      setIsAdminView(true);
      onClose();
      setError('');
    } else {
      setError(t('invalidAdmin' as any));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-teff-brown/40 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-cotton-white rounded-[2.5rem] shadow-2xl z-[110] overflow-hidden"
          >
            <div className="relative p-8 pt-12">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-teff-brown/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-teff-brown" />
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-teff-brown rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teff-brown/20 border-2 border-ethiopia-yellow">
                  <Shield className="w-8 h-8 text-ethiopia-yellow" />
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {t('adminLogin' as any)}
                </h2>
                <p className="text-teff-brown/60 text-sm italic">
                  Restricted access, authorized personnel only
                </p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-ethiopia-red/10 border border-ethiopia-red/20 p-4 rounded-xl flex items-center gap-3 mb-6"
                >
                  <AlertCircle className="w-5 h-5 text-ethiopia-red flex-shrink-0" />
                  <p className="text-sm text-ethiopia-red font-medium">{error}</p>
                </motion.div>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teff-brown/40" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('username' as any)}
                    className="w-full bg-white border border-teff-brown/10 rounded-2xl py-4 pl-12 pr-4 focus:border-teff-brown outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teff-brown/40" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('password')}
                    className="w-full bg-white border border-teff-brown/10 rounded-2xl py-4 pl-12 pr-4 focus:border-teff-brown outline-none transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-teff-brown text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teff-brown/90 transition-all shadow-xl shadow-teff-brown/20 mt-4"
                >
                  Access Dashboard
                  <ArrowRight className="w-5 h-5 text-ethiopia-yellow" />
                </button>
              </form>

              <div className="mt-8 text-center text-xs text-teff-brown/40">
                Contact the IT department for support.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
