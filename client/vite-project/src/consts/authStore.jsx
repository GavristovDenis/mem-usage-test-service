import { create } from "zustand";

const authStore = create((set) => ({
  loggedInUser: "",
  setLoggedInUser: (newValue) => set({ loggedInUser: newValue }),
  isLoggedIn: null,
  setIsLoggedIn: (newValue) => set({ isLoggedIn: newValue }),
}));

export default authStore;
