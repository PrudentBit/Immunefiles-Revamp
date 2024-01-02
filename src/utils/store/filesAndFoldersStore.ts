import { create } from 'zustand';
/* eslint-disable  no-unused-vars */

type SortByOptions = '' | 'extension' | 'dateAsc' | 'dateDesc' | 'sizeAsc' | 'sizeDesc' | 'alphabetical';

type Store = {
  files: FileOrFolderType[];
  folders: FileOrFolderType[];
  forceRefresh: boolean;
  sortBy: SortByOptions;
  setSortBy: (sortBy: SortByOptions) => void;
  sortFiles: () => void;
  sortFolders: () => void;
  addFile: (file: FileOrFolderType) => void;
  addFolder: (folder: FileOrFolderType) => void;
  removeFile: (hash: string) => void;
  removeFolder: (hash: string) => void;
  setFiles: (files: FileOrFolderType[]) => void;
  setFolders: (folders: FileOrFolderType[]) => void;
  removeAll(): void;
  toggleForceRefresh(): void;
};

export const useFileAndFolderStore = create<Store>((set, get) => ({
  files: [],
  folders: [],
  forceRefresh: false,
  sortBy: '',

  setSortBy: (sortBy) => set(() => ({ sortBy })),

  sortFiles: () => {
    const { files, sortBy } = get();
    const sortedFiles = [...files];
    switch (sortBy) {
      case 'extension':
        sortedFiles.sort((a, b) => (a.name.split('.').pop() || '').localeCompare(b.name.split('.').pop() || ''));
        break;
      case 'dateAsc':
        sortedFiles.sort((a, b) => new Date(a.date_created).getTime() - new Date(b.date_created).getTime());
        break;
      case 'dateDesc':
        sortedFiles.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
        break;
      case 'sizeAsc':
        sortedFiles.sort((a, b) => parseInt(a.size || '0') - parseInt(b.size || '0'));
        break;
      case 'sizeDesc':
        sortedFiles.sort((a, b) => parseInt(b.size || '0') - parseInt(a.size || '0'));
        break;
      case 'alphabetical':
        sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    set(() => ({ files: sortedFiles }));
  },

  sortFolders: () => {
    const { folders, sortBy } = get();
    const sortedFolders = [...folders];
    switch (sortBy) {
      case 'dateAsc':
        sortedFolders.sort((a, b) => new Date(a.date_created).getTime() - new Date(b.date_created).getTime());
        break;
      case 'dateDesc':
        sortedFolders.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
        break;
      case 'alphabetical':
        sortedFolders.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    set(() => ({ folders: sortedFolders }));
  },

  addFile: (file) => set((state) => ({ files: [...state.files, file] })),

  addFolder: (folder) =>
    set((state) => ({ folders: [...state.folders, folder] })),

  removeFile: (hash) =>
    set((state) => ({
      files: state.files.filter((file) => file.urlhash !== hash),
    })),

  removeFolder: (hash) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.urlhash !== hash),
    })),

  setFiles: (files) => set(() => ({ files })),

  setFolders: (folders) => set(() => ({ folders })),

  removeAll: () => set(() => ({ files: [], folders: [] })),

  toggleForceRefresh: () =>
    set((state) => ({ forceRefresh: !state.forceRefresh })),
}));
