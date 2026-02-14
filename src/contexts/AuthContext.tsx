'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User } from '@/types';
import { currentUser as mockUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: 'individual' | 'business';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'hayvanpazari_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorage'dan kullanıcı bilgisi yükle
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed.user);
        }
      } catch (error) {
        console.error('Auth load error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Mock login - gerçek uygulamada API çağrısı olacak
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock başarılı giriş
      const userData = {
        ...mockUser,
        email,
      };
      
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: userData }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mock register
  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `u${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: data.type,
        location: { city: '', district: '' },
        favorites: [],
        memberSince: new Date().toISOString(),
        isVerified: false,
      };
      
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: newUser }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: updated }));
      return updated;
    });
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
