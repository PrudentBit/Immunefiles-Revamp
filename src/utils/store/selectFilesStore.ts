import { create } from 'zustand';

type File = FileOrFolderType;

type State = {
  files: File[];
  addFile: (file: File) => void;
  removeFile: (urlhash: string) => void;
  removeAllFiles: () => void;
};

export const selectedFilesStore = create<State>((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (urlhash) =>
    set((state) => ({
      files: state.files.filter((file) => file.urlhash !== urlhash),
    })),
  removeAllFiles: () => set({ files: [] }),
}));
