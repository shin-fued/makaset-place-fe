"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  loginType: 'farmer' | 'business';
  setLoginType: (type: 'farmer' | 'business') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [loginType, setLoginType] = useState<'farmer' | 'business'>('farmer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedLoginType = localStorage.getItem('loginType') as 'farmer' | 'business' | null;
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (savedLoginType) {
      setLoginType(savedLoginType);
    }
    if (savedIsLoggedIn) {
      setIsLoggedIn(savedIsLoggedIn);
    }
  }, []);

  // Save to localStorage whenever loginType or isLoggedIn changes
  useEffect(() => {
    localStorage.setItem('loginType', loginType);
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [loginType, isLoggedIn]);

  const value = {
    loginType,
    setLoginType,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
