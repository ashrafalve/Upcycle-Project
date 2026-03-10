'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] p-4 rounded-lg shadow-lg border flex items-start gap-3 ${
            toast.variant === 'success' ? 'bg-green-50 border-green-200' :
            toast.variant === 'error' ? 'bg-red-50 border-red-200' :
            toast.variant === 'warning' ? 'bg-yellow-50 border-yellow-200' :
            'bg-white border-gray-200'
          }`}
        >
          <div className="flex-1">
            <p className={`font-medium ${
              toast.variant === 'success' ? 'text-green-800' :
              toast.variant === 'error' ? 'text-red-800' :
              toast.variant === 'warning' ? 'text-yellow-800' :
              'text-gray-800'
            }`}>{toast.title}</p>
            {toast.description && (
              <p className={`text-sm mt-1 ${
                toast.variant === 'success' ? 'text-green-600' :
                toast.variant === 'error' ? 'text-red-600' :
                toast.variant === 'warning' ? 'text-yellow-600' :
                'text-gray-600'
              }`}>{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
