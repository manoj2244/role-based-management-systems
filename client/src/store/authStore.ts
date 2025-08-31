import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  currentUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;

  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  accessToken: null,
  refreshToken: null,

  setUser: (user) => set({ currentUser: user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),

  login: (user, accessToken, refreshToken) =>
    set({ currentUser: user, accessToken, refreshToken }),

  logout: () => set({ currentUser: null, accessToken: null, refreshToken: null }),
}));
