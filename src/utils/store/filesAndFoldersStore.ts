import { create } from 'zustand';
/* eslint-disable  no-unused-vars */
type Store = {
  files: FileOrFolderType[];
  folders: FileOrFolderType[];
  forceRefresh: boolean;
  addFile: (file: FileOrFolderType) => void;
  addFolder: (folder: FileOrFolderType) => void;
  removeFile: (hash: string) => void;
  removeFolder: (hash: string) => void;
  setFiles: (files: FileOrFolderType[]) => void;
  setFolders: (folders: FileOrFolderType[]) => void;
  removeAll(): void;
  toggleForceRefresh(): void;
};

export const useFileAndFolderStore = create<Store>((set) => ({
  files: [],
  folders: [],
  forceRefresh: false,

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
