import { create } from "zustand";

type Cache = {
  data: Record<string, unknown>;
  setData: (key: string, value: unknown) => void;
  invalidateCache: (key: string) => void;
};

export const useCache = create<Cache>()((set) => ({
  data: {},
  setData: (key: string, value: unknown) =>
    set((state) => {
      state.data[key] = value;
      return {
        data: state.data,
      };
    }),
  invalidateCache: (key: string) =>
    set((state) => {
      delete state.data[key];
      return {
        data: state.data,
      };
    }),
}));
