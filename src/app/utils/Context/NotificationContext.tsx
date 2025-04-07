import React, { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: string;
  heading: string;
  content: string;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (heading: string, content: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(
  null
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (heading: string, content: string) => {
    const newNotification = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      heading,
      content,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
