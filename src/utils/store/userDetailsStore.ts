import {create} from 'zustand';

type Store = {
    userDetails: UserDetailsType | undefined;
    setUserDetails: (_userDetails: UserDetailsType) => void;
};

export const UserDetailsStore = create<Store>((set) => ({
    userDetails: undefined,
    setUserDetails: (userDetails) => set({ userDetails }),
}));