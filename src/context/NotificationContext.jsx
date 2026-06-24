import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  const notify = useCallback((message) => {
    setNotification(message);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNotification(null), 3000);
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, notify, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotify() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotify debe usarse dentro de NotificationProvider");
  return context;
}
