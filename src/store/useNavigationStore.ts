import { create } from 'zustand';

interface NavigationStore {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPath: '/',
  setCurrentPath: (path) => set({ currentPath: path }),
}));