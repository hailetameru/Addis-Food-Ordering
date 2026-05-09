import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { t, language } = useApp();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-teff-brown/40 backdrop-blur-md z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-cotton-white rounded-[2.5rem] shadow-2xl z-[90] overflow-hidden"
          >
            <div className="relative p-8 pt-12">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-teff-brown/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-teff-brown" />
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-ethiopia-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-ethiopia-green/20">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {isLogin ? t('login') : t('register')}
                </h2>
                <p className="text-teff-brown/60 text-sm italic">
                  {t('subtitle')}
                </p>
              </div>

              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teff-brown/40" />
                    <input 
                      type="text" 
                      placeholder={t('name')}
                      className="w-full bg-white border border-teff-brown/10 rounded-2xl py-4 pl-12 pr-4 focus:border-ethiopia-green outline-none transition-colors"
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teff-brown/40" />
                  <input 
                    type="email" 
                    placeholder={t('email')}
                    className="w-full bg-white border border-teff-brown/10 rounded-2xl py-4 pl-12 pr-4 focus:border-ethiopia-green outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teff-brown/40" />
                  <input 
                    type="password" 
                    placeholder={t('password')}
                    className="w-full bg-white border border-teff-brown/10 rounded-2xl py-4 pl-12 pr-4 focus:border-ethiopia-green outline-none transition-colors"
                  />
                </div>

                {isLogin && (
                  <button className="text-xs text-ethiopia-red font-bold self-end hover:underline">
                    {t('forgotPassword')}
                  </button>
                )}

                <button className="w-full bg-ethiopia-green text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-ethiopia-green/90 transition-all shadow-xl shadow-ethiopia-green/20 mt-4">
                  {isLogin ? t('login') : t('register')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 text-center bg-teff-brown/5 p-6 -mx-8 -mb-8 rounded-t-[2rem]">
                <p className="text-sm text-teff-brown/60">
                  {isLogin ? t('noAccount') : t('hasAccount')}{' '}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-ethiopia-green font-bold hover:underline"
                  >
                    {isLogin ? t('register') : t('login')}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
