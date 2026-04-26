
import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-glass backdrop-blur-xl border border-glass-border p-6 rounded-3xl shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
