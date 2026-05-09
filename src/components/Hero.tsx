import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { t, language } = useApp();

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop" 
          alt="Ethiopian Food Feast"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-teff-brown/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-cotton-white via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1 w-12 bg-ethiopia-yellow rounded-full" />
              <span className="text-ethiopia-yellow uppercase tracking-[0.2em] text-sm font-bold">
                Authentic Addis
              </span>
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] ${language === 'am' ? 'amharic' : ''}`}>
              {t('title')}
            </h1>
            
            <p className="text-xl text-cotton-white/90 mb-8 max-w-lg leading-relaxed italic border-l-4 border-ethiopia-green pl-6">
              {t('subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-ethiopia-green text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl shadow-ethiopia-green/20"
              >
                {t('orderNow')}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
              >
                {t('menu')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative floating element */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 bottom-20 w-96 h-96 opacity-30 pointer-events-none md:block hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=2070&auto=format&fit=crop" 
          alt="Ethiopian Feast" 
          className="w-full h-full object-contain rounded-full shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
}
