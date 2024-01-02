import { create } from 'zustand';

type Store = {
  files: groupFileandFolderType[];
  folders: groupFileandFolderType[];
  forceRefresh: boolean;
  addFile: (file: groupFileandFolderType) => void;
  addFolder: (folder: groupFileandFolderType) => void;
  removeFile: (hash: string) => void;
  removeFolder: (hash: string) => void;
  setFiles: (files: groupFileandFolderType[]) => void;
  setFolders: (folders: groupFileandFolderType[]) => void;
  removeAll(): void;
  toggleForceRefresh(): void;
};

export const useGroupFilesAndFoldersStore = create<Store>((set) => ({
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
