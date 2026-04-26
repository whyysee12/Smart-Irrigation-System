import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface AlertCardProps {
  message: string;
  type: 'info' | 'warning' | 'error';
}

const AlertCard: React.FC<AlertCardProps> = ({ message, type }) => {
  const baseClasses = 'flex items-center p-4 rounded-2xl backdrop-blur-md border';
  const typeClasses = {
    info: 'bg-blue-500/10 text-blue-200 border-blue-500/20',
    warning: 'bg-yellow-500/10 text-yellow-200 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-200 border-red-500/20',
  };

  const Icon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0 text-red-500" />;
      default:
        return <Info className="w-6 h-6 mr-3 flex-shrink-0 text-blue-400" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${typeClasses[type]}`}
    >
      <Icon />
      <p className="text-sm font-medium leading-relaxed">{message}</p>
    </motion.div>
  );
};

export default AlertCard;
