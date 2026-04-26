
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-xl border-t border-glass-border mt-12 relative z-10">
      <div className="container mx-auto px-4 py-8 text-center text-slate-400">
        <p className="font-medium text-slate-300">&copy; {new Date().getFullYear()} Smart Irrigation System. All Rights Reserved.</p>
        <p className="text-sm mt-2 font-mono text-slate-500">Powered by React, Tailwind CSS, and ESP32 Telemetry.</p>
      </div>
    </footer>
  );
};

export default Footer;
