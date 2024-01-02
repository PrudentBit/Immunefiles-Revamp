import { create } from 'zustand';

type Store = {
  groups: GroupDetailsType[];
  setGroups: (_groups: GroupDetailsType[]) => void;
};

export const GroupStore = create<Store>((set) => ({
  groups: [],
  setGroups: (groups) => set({ groups }),
}));
