import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: number;
}

interface NotificationContextType {
  notifications: Notification[];
  hasUnread: boolean;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: number) => void;
  clearNotifications: () => void;
  markAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      timestamp: Date.now(),
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 20)); // Keep last 20 notifications
    setHasUnread(true);
  }, []);

  const dismissNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setHasUnread(false);
  }, []);

  const markAsRead = useCallback(() => {
    setHasUnread(false);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, hasUnread, addNotification, dismissNotification, clearNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
