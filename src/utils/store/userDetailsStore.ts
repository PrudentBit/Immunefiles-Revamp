import {create} from 'zustand';

type Store = {
    userDetails: UserDetailsType | undefined;
    setUserDetails: (_userDetails: UserDetailsType) => void;
    forceRefresh: boolean;
    toggleForceRefresh: () => void;
};

export const UserDetailsStore = create<Store>((set) => ({
    userDetails: undefined,
    setUserDetails: (userDetails) => set({ userDetails }),
    forceRefresh: false,
    toggleForceRefresh: () => set((state) => ({ forceRefresh: !state.forceRefresh }))
}));