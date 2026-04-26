
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Droplets, Cpu, Activity, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] relative">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-48 h-48 mb-12"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative bg-glass backdrop-blur-xl border border-glass-border rounded-full w-full h-full flex items-center justify-center shadow-[0_0_40px_rgba(13,148,136,0.3)]">
          <Droplets className="w-24 h-24 text-primary" />
        </div>
        
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 bg-glass border border-glass-border p-3 rounded-2xl backdrop-blur-md"
        >
          <Cpu className="w-6 h-6 text-accent" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-2 -left-6 bg-glass border border-glass-border p-3 rounded-2xl backdrop-blur-md"
        >
          <Activity className="w-6 h-6 text-secondary" />
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-base-200 to-slate-400 tracking-tight"
      >
        Smart Irrigation <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reimagined.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-slate-400 font-light leading-relaxed"
      >
        Powered by ESP32 and advanced telemetry. Monitor soil moisture, temperature, humidity, and control your water pump with precision.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/dashboard"
          className="px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:shadow-[0_0_30px_rgba(13,148,136,0.6)] hover:bg-teal-500 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        >
          <Activity className="w-5 h-5 mr-2" />
          Launch Dashboard
        </Link>
        <Link
          to="/about"
          className="px-8 py-4 bg-glass border border-glass-border text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
        >
          <Zap className="w-5 h-5 mr-2" />
          System Specs
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
