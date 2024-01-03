import { create } from 'zustand';

type File = FileOrFolderType;

type State = {
  files: File[];
  addFile: (_file: File) => void;
  removeFile: (_urlhash: string) => void;
  removeAllFiles: () => void;
  removeDupes: () => void;
};

export const selectedFilesStore = create<State>((set) => ({
  files: [],
  addFile: (file) => set((state) => {
    if (!state.files.some(existingFile => existingFile.urlhash === file.urlhash)) {
      return { files: [...state.files, file] };
    }
    return state;
  }),
  removeFile: (urlhash) =>
    set((state) => ({
      files: state.files.filter((file) => file.urlhash !== urlhash),
    })),
  removeAllFiles: () => set({ files: [] }),
  removeDupes: () => set((state) => {
    const uniqueFiles = Array.from(new Set(state.files.map(file => file.urlhash)))
      .map(urlhash => {
        return state.files.find(file => file.urlhash === urlhash)
      })
      .filter(file => file !== undefined) as File[];
    return { files: uniqueFiles };
  }),
}));
