"use client";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  userInfo:
    typeof window !== "undefined" ? localStorage.getItem("userInfo") : null,
  token:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))?.token
      : null,
  setToken: (token) => {
    set({ token });
  },
  setUserInfo: (info) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userInfo", info);
    }
    set({ userInfo: info });
  },
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userInfo");
    }
    set({ userInfo: null });
    set({ token: null });
  },
}));

export default useAuthStore;
