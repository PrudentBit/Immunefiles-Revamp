import { create } from 'zustand';

type Store = {
  groups: GroupDetailsType[];
  setGroups: (_groups: GroupDetailsType[]) => void;
  forceRefresh: boolean;
  toggleForceRefresh(): void;
};

export const GroupStore = create<Store>((set) => ({
  groups: [],
  setGroups: (groups) => set({ groups }),
  forceRefresh: false,
  toggleForceRefresh: () => set((state) => ({ forceRefresh: !state.forceRefresh })),
}));
