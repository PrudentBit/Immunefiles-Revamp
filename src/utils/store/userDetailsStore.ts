import {create} from 'zustand';

type Store = {
    userDetails: UserDetailsType | null;
    setUserDetails: (userDetails: UserDetailsType) => void;
};

export const UserDetailsStore = create<Store>((set) => ({
    userDetails: null,
    setUserDetails: (userDetails) => set({ userDetails }),
}));
