import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ShoppingCart, Info, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Menu() {
  const { t, language, addToCart, menuItems } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const categories = ['all', 'stews', 'meat', 'vegetarian', 'coffee'];

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">{t('popularDishes')}</h2>
            <div className="h-1.5 w-24 bg-ethiopia-green rounded-full" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-ethiopia-green text-white shadow-lg shadow-ethiopia-green/20' 
                    : 'bg-teff-brown/5 text-teff-brown hover:bg-teff-brown/10'
                }`}
              >
                {t(cat as any)}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-cotton-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-teff-brown/5"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-ethiopia-yellow fill-ethiopia-yellow" />
                    <span className="text-xs font-bold text-teff-brown">{item.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold text-teff-brown ${language === 'am' ? 'amharic' : ''}`}>
                      {language === 'am' ? item.amName : item.name}
                    </h3>
                    <span className="text-lg font-bold text-ethiopia-green">{item.price} ETB</span>
                  </div>
                  
                  <p className="text-sm text-teff-brown/60 mb-6 line-clamp-2 italic">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-teff-brown text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-ethiopia-green transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      {t('addToCart')}
                    </button>
                    <button className="p-3 bg-teff-brown/5 rounded-2xl hover:bg-teff-brown/10 transition-colors">
                      <Info className="w-5 h-5 text-teff-brown/60" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
