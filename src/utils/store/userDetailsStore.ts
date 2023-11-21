import {create} from 'zustand';

type Store = {
    userDetails: UserDetailsType | null;
    setUserDetails: (_userDetails: UserDetailsType) => void;
};

export const UserDetailsStore = create<Store>((set) => ({
    userDetails: null,
    setUserDetails: (userDetails) => set({ userDetails }),
}));
