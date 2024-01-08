import { create } from "zustand";

type Store = {
  totalServers: number;
  selectedServers: string[];
  forceRefresh: boolean;
  setSelectedServers: (_servers: string[]) => void;
  removeAll(): void;
  setTotalServers: (_total: number) => void;
  toggleForceRefresh: () => void;
};

export const selectedServersStore = create<Store>((set) => ({
  totalServers: 0,
  selectedServers: [],
  forceRefresh: false,
  setSelectedServers: (servers) => set({ selectedServers: servers }),
  removeAll: () => set({ selectedServers: [] }),
  setTotalServers: (total) => set({ totalServers: total }),
  toggleForceRefresh: () => set((state) => ({ forceRefresh: !state.forceRefresh })),
}));