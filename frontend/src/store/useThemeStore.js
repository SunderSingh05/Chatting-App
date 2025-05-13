import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chattingApp-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("chattingApp-theme", theme);
        set({ theme });
    },
}));
