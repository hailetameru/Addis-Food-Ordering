import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { t, language, cart, updateQuantity, removeFromCart, total } = useApp();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-teff-brown/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cotton-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-teff-brown/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ethiopia-green/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-ethiopia-green" />
                </div>
                <h2 className="text-xl font-bold">{t('cart')}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-teff-brown/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium">{t('emptyCart')}</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-teff-brown/5 shadow-sm"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-teff-brown">
                          {language === 'am' ? item.amName : item.name}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-ethiopia-red p-1 hover:bg-ethiopia-red/5 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-ethiopia-green mb-3">
                        {item.price} ETB
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-teff-brown/5 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-teff-brown ml-auto">
                          {item.price * item.quantity} ETB
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-teff-brown/10">
                <div className="flex justify-between mb-6">
                  <span className="text-teff-brown/60 font-medium">{t('total')}</span>
                  <span className="text-2xl font-bold text-ethiopia-green">{total} ETB</span>
                </div>
                <button className="w-full bg-ethiopia-green text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-ethiopia-green/90 transition-all shadow-xl shadow-ethiopia-green/20">
                  {t('checkout')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
