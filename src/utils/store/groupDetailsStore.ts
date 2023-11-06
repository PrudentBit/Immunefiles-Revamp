import { create } from 'zustand';

type Store = {
  groups: GroupDetailsType[] | null;
  setGroups: (groups: GroupDetailsType[]) => void;
};

export const GroupStore = create<Store>((set) => ({
  groups: null,
  setGroups: (groups) => set({ groups }),
}));
