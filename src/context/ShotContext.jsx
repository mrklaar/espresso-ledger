import { createContext, useContext, useState, useCallback } from 'react';
import { loadShots, saveShots } from '../utils/storage';

const ShotContext = createContext();

export function ShotProvider({ children }) {
  const [shots, setShots] = useState(() => loadShots());

  const addShot = useCallback((shot) => {
    setShots((prev) => {
      const next = [shot, ...prev];
      saveShots(next);
      return next;
    });
  }, []);

  const updateShot = useCallback((id, updates) => {
    setShots((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updates } : s));
      saveShots(next);
      return next;
    });
  }, []);

  const deleteShot = useCallback((id) => {
    setShots((prev) => {
      const next = prev.filter((s) => s.id !== id);
      saveShots(next);
      return next;
    });
  }, []);

  return (
    <ShotContext.Provider value={{ shots, addShot, updateShot, deleteShot }}>
      {children}
    </ShotContext.Provider>
  );
}

export function useShots() {
  const ctx = useContext(ShotContext);
  if (!ctx) throw new Error('useShots must be used within ShotProvider');
  return ctx;
}
