import { createContext, useContext, useState, useCallback } from 'react';
import { loadProfile, saveProfile } from '../utils/storage';
import { defaultProfile } from '../utils/defaults';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => loadProfile() || defaultProfile);

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      saveProfile(next);
      return next;
    });
  }, []);

  const updateEquipment = useCallback((key, value) => {
    setProfile((prev) => {
      const next = {
        ...prev,
        equipment: { ...prev.equipment, [key]: value },
      };
      saveProfile(next);
      return next;
    });
  }, []);

  const updateDefaults = useCallback((key, value) => {
    setProfile((prev) => {
      const next = {
        ...prev,
        defaults: { ...prev.defaults, [key]: value },
      };
      saveProfile(next);
      return next;
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updateEquipment, updateDefaults }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
