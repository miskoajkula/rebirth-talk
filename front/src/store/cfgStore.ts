import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LabelType = {
  slug: string
  name: string
  bgColor: string
}

type CfgType = {
  labels: [LabelType]
}

interface CfgStore {
  user: CfgType | null;
  setCfg: (cfg: CfgType) => void;
  clearUser: () => void;
}

export const useUserStore = create<CfgStore>()(
  persist(
    (set) => ({
      user: null,
      setCfg: (cfg: CfgType) => set({ cfg }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'cfg-storage',
      getStorage: () => localStorage,
    }
  )
);
