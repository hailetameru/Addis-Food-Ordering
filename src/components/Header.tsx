import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Globe, Phone, MapPin, Search, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { language, setLanguage, t, cart, setIsCartOpen, setIsAuthOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cotton-white/80 backdrop-blur-md border-b border-teff-brown/10">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-ethiopia-green rounded-full flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xl">A</span>
          </div>
          <span className={`text-xl font-serif font-bold tracking-tight text-teff-brown ${language === 'am' ? 'amharic' : ''}`}>
            {t('title')}
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#home">{t('home')}</NavLink>
          <NavLink href="#menu">{t('menu')}</NavLink>
          <NavLink href="#about">{t('about')}</NavLink>
          <NavLink href="#contact">{t('contact')}</NavLink>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            className="hidden sm:flex p-2 hover:bg-teff-brown/5 rounded-full transition-colors items-center gap-2 text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? 'አማርኛ' : 'English'}</span>
          </button>
          
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="p-2 hover:bg-teff-brown/5 rounded-full transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <User className="w-5 h-5 text-teff-brown" />
            <span className="hidden lg:block">{t('login')}</span>
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-teff-brown/5 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-teff-brown" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-ethiopia-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-teff-brown/5 rounded-full transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cotton-white border-t border-teff-brown/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <MobileNavLink href="#home">{t('home')}</MobileNavLink>
              <MobileNavLink href="#menu">{t('menu')}</MobileNavLink>
              <MobileNavLink href="#about">{t('about')}</MobileNavLink>
              <MobileNavLink href="#contact">{t('contact')}</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-sm font-medium text-teff-brown/70 hover:text-ethiopia-green transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ethiopia-green transition-all group-hover:w-full" />
    </a>
  );
}

function MobileNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-lg font-medium text-teff-brown py-2 border-b border-teff-brown/5"
    >
      {children}
    </a>
  );
}
