import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DesignRequest } from '@/services/api/types';

export interface UpcycleRequestItem {
  id: number;
  title: string;
  description: string;
  itemImage: string;
  desiredTransformation: string;
  budgetMin: number;
  budgetMax: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  designer?: string;
  createdAt: string;
}

interface RequestState {
  requests: UpcycleRequestItem[];
  addRequest: (request: Omit<UpcycleRequestItem, 'id' | 'status' | 'createdAt'>) => void;
  updateRequest: (id: number, updates: Partial<UpcycleRequestItem>) => void;
  removeRequest: (id: number) => void;
  clearRequests: () => void;
  getRequestById: (id: number) => UpcycleRequestItem | undefined;
  getRequestsByStatus: (status: UpcycleRequestItem['status']) => UpcycleRequestItem[];
}

export const useRequestStore = create<RequestState>()(
  persist(
    (set, get) => ({
      requests: [],
      
      addRequest: (request) =>
        set((state) => {
          const newRequest: UpcycleRequestItem = {
            ...request,
            id: Date.now(),
            status: 'pending',
            createdAt: new Date().toISOString(),
          };
          return { requests: [newRequest, ...state.requests] };
        }),
      
      updateRequest: (id, updates) =>
        set((state) => ({
          requests: state.requests.map((req) =>
            req.id === id ? { ...req, ...updates } : req
          ),
        })),
      
      removeRequest: (id) =>
        set((state) => ({
          requests: state.requests.filter((req) => req.id !== id),
        })),
      
      clearRequests: () => set({ requests: [] }),
      
      getRequestById: (id) => get().requests.find((req) => req.id === id),
      
      getRequestsByStatus: (status) =>
        get().requests.filter((req) => req.status === status),
    }),
    {
      name: 'request-storage',
    }
  )
);
