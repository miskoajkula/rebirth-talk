import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AvatarType = {
  colors: string[]
  name: string
}

type UserInfo = {
  email: string
  createdAt: string
  avatar: AvatarType
  username: string
  socialAuth: boolean
}

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserInfo) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);
