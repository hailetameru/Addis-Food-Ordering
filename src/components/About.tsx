import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { t, language } = useApp();

  return (
    <section id="about" className="py-24 bg-cotton-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/src/assets/images/regenerated_image_1778325766081.jpg" 
                alt="Ethiopian Chef" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-ethiopia-yellow rounded-3xl -z-0 opacity-20 blur-2xl" />
            <div className="absolute -top-10 -left-10 w-20 h-20 border-4 border-ethiopia-green rounded-full opacity-20" />
            <div className="absolute top-1/2 -right-12 w-24 h-24 bg-ethiopia-red/10 rounded-full blur-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-ethiopia-green font-bold tracking-widest uppercase text-sm mb-4">Our Story</h4>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Bringing the flavors of <span className="text-ethiopia-red">Addis</span> to your doorstep.
            </h2>
            <p className="text-lg text-teff-brown/70 mb-8 leading-relaxed">
              Founded in the heart of Addis Ababa, our mission is to celebrate the rich culinary heritage of Ethiopia. We work with local chefs and use authentic spices sourced directly from regional markets to ensure every bite tells a story.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-white rounded-2xl border border-teff-brown/5 shadow-sm">
                <p className="text-3xl font-bold text-ethiopia-green mb-1">15+</p>
                <p className="text-sm text-teff-brown/60 font-medium">Local Restaurants</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-teff-brown/5 shadow-sm">
                <p className="text-3xl font-bold text-ethiopia-yellow mb-1">30min</p>
                <p className="text-sm text-teff-brown/60 font-medium">Avg. Delivery</p>
              </div>
            </div>
            <button className="text-ethiopia-green font-bold flex items-center gap-2 group">
              Learn more about our heritage
              <span className="w-10 h-0.5 bg-ethiopia-green transition-all group-hover:w-16" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
