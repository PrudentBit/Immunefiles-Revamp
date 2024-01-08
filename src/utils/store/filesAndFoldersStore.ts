import { create } from 'zustand';

type sortBy = "name" | "size" | "created" | "modified";
type order = "asc" | "dsc";

type Store = {
  files: FileOrFolderType[];
  folders: FileOrFolderType[];
  forceRefresh: boolean;
  sortBy: sortBy;
  order: order;
  addFile: (_file: FileOrFolderType) => void;
  addFolder: (_folder: FileOrFolderType) => void;
  removeFile: (_hash: string) => void;
  removeFolder: (_hash: string) => void;
  setFiles: (_files: FileOrFolderType[]) => void;
  setFolders: (_folders: FileOrFolderType[]) => void;
  removeAll(): void;
  toggleForceRefresh(): void;
  setSortBy(_sortBy: sortBy): void;
  setOrder(_order: order): void;
};

export const useFileAndFolderStore = create<Store>((set) => ({
  files: [],
  folders: [],
  forceRefresh: false,
  sortBy: "name",
  order: "asc",

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

  setSortBy: (sortBy) => set(() => ({ sortBy })),
  setOrder: (order) => set(() => ({ order })),
}));
