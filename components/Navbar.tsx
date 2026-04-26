import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Droplets, Home, LayoutDashboard, LineChart, Settings, Info, Bell, AlertTriangle, Info as InfoIconLucide } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const NavItem: React.FC<{ to: string; children: React.ReactNode; }> = ({ to, children }) => {
    const activeStyle = {
        color: '#34D399',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
    };
    return (
        <NavLink
            to={to}
            className="flex items-center px-4 py-2 text-slate-300 hover:bg-white/5 hover:text-accent rounded-full transition-all duration-300 border border-transparent"
            style={({ isActive }) => isActive ? activeStyle : {}}
        >
            {children}
        </NavLink>
    );
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { notifications, hasUnread, dismissNotification, clearNotifications, markAsRead } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (hasUnread) {
        markAsRead();
    }
  }

  const getNotificationIcon = (type: string) => {
    switch(type) {
        case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
        case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />;
        default: return <InfoIconLucide className="w-5 h-5 text-blue-400" />;
    }
  }

  return (
    <nav className="bg-glass backdrop-blur-xl border-b border-glass-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center space-x-3 text-xl font-bold text-white group">
            <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors">
              <Droplets className="w-6 h-6 text-primary" />
            </div>
            <span className="tracking-tight">Smart Irrigation</span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-2 bg-black/20 p-1.5 rounded-full border border-glass-border">
            <NavItem to="/"><Home className="w-4 h-4 mr-2" />Home</NavItem>
            <NavItem to="/dashboard"><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</NavItem>
            <NavItem to="/analytics"><LineChart className="w-4 h-4 mr-2" />Analytics</NavItem>
            <NavItem to="/settings"><Settings className="w-4 h-4 mr-2" />Settings</NavItem>
            <NavItem to="/about"><Info className="w-4 h-4 mr-2" />About</NavItem>
          </div>
          
          <div className="flex items-center">
            <div className="relative" ref={notificationRef}>
                <button onClick={handleNotificationToggle} className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none mr-2">
                    <Bell className="w-5 h-5" />
                    {hasUnread && <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-bg-dark" />}
                </button>
                {isNotificationsOpen && (
                    <div className="absolute right-0 mt-4 w-80 bg-bg-light/95 backdrop-blur-xl border border-glass-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                        <div className="p-4 flex justify-between items-center border-b border-glass-border bg-black/20">
                            <h4 className="font-semibold text-white">Notifications</h4>
                            {notifications.length > 0 && <button onClick={clearNotifications} className="text-xs font-medium text-primary hover:text-teal-400 transition-colors">Clear All</button>}
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map(notif => (
                                    <div key={notif.id} className="p-4 flex items-start border-b border-glass-border hover:bg-white/5 transition-colors group">
                                        <div className="flex-shrink-0 mr-3 mt-0.5 bg-black/20 p-2 rounded-lg">{getNotificationIcon(notif.type)}</div>
                                        <div className="flex-grow">
                                            <p className="text-sm text-slate-200 leading-relaxed">{notif.message}</p>
                                            <p className="text-xs text-slate-500 mt-2 font-mono">{new Date(notif.timestamp).toLocaleTimeString()}</p>
                                        </div>
                                        <button onClick={() => dismissNotification(notif.id)} className="ml-2 text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center flex flex-col items-center justify-center">
                                  <Bell className="w-8 h-8 text-slate-600 mb-3" />
                                  <p className="text-slate-400 text-sm">No new notifications</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-bg-dark/95 backdrop-blur-xl border-b border-glass-border">
          <NavItem to="/"><Home className="w-4 h-4 mr-2" />Home</NavItem>
          <NavItem to="/dashboard"><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</NavItem>
          <NavItem to="/analytics"><LineChart className="w-4 h-4 mr-2" />Analytics</NavItem>
          <NavItem to="/settings"><Settings className="w-4 h-4 mr-2" />Settings</NavItem>
          <NavItem to="/about"><Info className="w-4 h-4 mr-2" />About</NavItem>
        </div>
      )}
    </nav>
  );
};

export default Navbar;