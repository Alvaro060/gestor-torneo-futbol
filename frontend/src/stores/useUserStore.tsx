import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Definición de la estructura de los datos del usuario.
 */
interface User {
  role: "None" | "admin" | "user";
}

/**
 * Definición del estado del store de usuario.
 */
interface UserStore {
  user: User;
  setUser: (userData: User) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
}

/**
 * Hook personalizado para gestionar el estado del usuario.
 */
const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: { role: "None" }, // Estado inicial sin usuario

      setUser: (userData) => set({ user: userData }),

      clearUser: () => set({ user: { role: "None" } }),

      isLoggedIn: () => get().user.role !== "None",
      isAdmin: () => get().user.role === "admin",
      isUser: () => get().user.role === "user",
    }),
    {
      name: "user-storage", // Clave en sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Persistencia en sessionStorage
    }
  )
);

export default useUserStore;
