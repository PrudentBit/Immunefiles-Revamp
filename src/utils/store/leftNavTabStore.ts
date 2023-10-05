import { create } from 'zustand';


type tab = string;

type State = {
  tab: tab;
  changeTab: (tab: tab) => void;
};

export const tabStore = create<State>((set) => ({
  tab: "dashboard",
  changeTab: (tab) => set({ tab }),
}));
