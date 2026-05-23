import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true,
  toggleTheme: () =>
    set((state) => {
      const newDark = !state.isDark;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("light", !newDark);
        document.documentElement.classList.toggle("dark", newDark);
      }
      return { isDark: newDark };
    }),
  setDark: (isDark: boolean) =>
    set(() => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("light", !isDark);
        document.documentElement.classList.toggle("dark", isDark);
      }
      return { isDark };
    }),
}));
