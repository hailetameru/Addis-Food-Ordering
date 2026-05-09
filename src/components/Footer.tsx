import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t, language, setIsAdminLoginOpen } = useApp();

  return (
    <footer className="bg-teff-brown text-cotton-white py-20 overflow-hidden relative">
      {/* Decorative pulse */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ethiopia-green/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-ethiopia-green rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">A</span>
              </div>
              <span className={`text-xl font-serif font-bold text-white ${language === 'am' ? 'amharic' : ''}`}>
                {t('title')}
              </span>
            </div>
            <p className="text-cotton-white/60 mb-8 max-w-xs leading-relaxed italic">
              {t('subtitle')}
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook />} color="#1877F2" label="Facebook" />
              <SocialIcon icon={<Instagram />} color="#E4405F" label="Instagram" />
              <SocialIcon icon={<MessageCircle />} color="#25D366" label="WhatsApp" />
              <SocialIcon icon={<Twitter />} color="#1DA1F2" label="Twitter" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wider uppercase">{t('menu')}</h4>
            <ul className="flex flex-col gap-4">
              <FooterLink>{t('stews')}</FooterLink>
              <FooterLink>{t('meat')}</FooterLink>
              <FooterLink>{t('vegetarian')}</FooterLink>
              <FooterLink>{t('coffee')}</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wider uppercase">System</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <button 
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="text-cotton-white/60 hover:text-ethiopia-green transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ethiopia-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admin Dashboard
                </button>
              </li>
              <FooterLink>Our History</FooterLink>
              <FooterLink>Addis Chefs</FooterLink>
              <FooterLink>Delivery Areas</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wider uppercase">{t('contact')}</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-ethiopia-green/20 transition-colors">
                  <Phone className="w-5 h-5 text-ethiopia-green" />
                </div>
                <div>
                  <p className="text-xs text-cotton-white/40 uppercase font-bold tracking-tighter">Call us</p>
                  <p className="font-bold">+251 911 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-ethiopia-green/20 transition-colors">
                  <MapPin className="w-5 h-5 text-ethiopia-green" />
                </div>
                <div>
                  <p className="text-xs text-cotton-white/40 uppercase font-bold tracking-tighter">Visit us</p>
                  <p className="font-bold">Bole Road, Addis Ababa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-cotton-white/40">
            &copy; 2026 Addis Food Ordering System. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-cotton-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-cotton-white/40 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, color, label }: { icon: React.ReactNode, color: string, label: string }) {
  return (
    <motion.a
      whileHover={{ y: -5, scale: 1.1 }}
      href="#"
      aria-label={label}
      className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:border-ethiopia-green/50 transition-colors"
      style={{ color }}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
    </motion.a>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <a href="#" className="text-cotton-white/60 hover:text-ethiopia-green transition-colors flex items-center gap-2 group">
        <span className="w-1.5 h-1.5 rounded-full bg-ethiopia-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
        {children}
      </a>
    </li>
  );
}
