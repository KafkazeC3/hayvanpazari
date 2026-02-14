'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface UIContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto hide
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const openModal = useCallback((content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'unset';
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setIsSidebarOpen(open);
  }, []);

  const value: UIContextType = {
    toasts,
    showToast,
    hideToast,
    isModalOpen,
    modalContent,
    openModal,
    closeModal,
    isSidebarOpen,
    toggleSidebar,
    setSidebarOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
