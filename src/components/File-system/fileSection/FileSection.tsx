import {useState, memo} from 'react';
import Image from "next/image";
import SelectionArea, {SelectionEvent} from '@viselect/react';
import File from "@/components/File-system/File";
import { selectedFilesStore } from '@/utils/store/selectFilesStore';

type FileSectionProps = {
  subFiles: FileOrFolderType[];
  type: string;
}

const FileSection = ({ subFiles, type }: FileSectionProps) => {
  console.log('FileSection called');
  const sectionType = type === "folder" ? "Folders" : "Files";
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  console.log('selected', selected);
  const [files, addFile, removeFile, removeDupes] = selectedFilesStore(
    (state) => [
      state.files,
      state.addFile,
      state.removeFile,
      state.removeDupes
    ]
  )

  const extractIds = (els: Element[]): number[] =>{
    const id = els.map(v => v.getAttribute('data-key'))
        .map(Number);
    return id;
  }

  const onStart = ({event, selection}: SelectionEvent) => {
      if (!event?.ctrlKey && !event?.metaKey) {
          selection.clearSelection();
          setSelected(() => new Set());
      }
  };

  const onMove = ({ store: {changed: {added, removed}}}: SelectionEvent) => {
    console.log('onMove called');
    setSelected(prev => {
      const next = new Set(prev);
      extractIds(added).forEach(id => {
          next.add(id);
          const file = subFiles[id];
          if (!files.includes(file)) 
            addFile(file);
          ;
          removeDupes();
      });
      extractIds(removed).forEach(id => {
          next.delete(id);
          const file = subFiles[id];
          removeFile(file.urlhash);
      });
      return next;
    });
  };

  return (
    <section className="flex flex-col">
      <div className="flex gap-2">
        <Image
          src={`/${type}-icon.svg`}
          width={20}
          height={20}
          alt={`${type} icon`}
          className="ml-[2px]"
        />
        <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">{sectionType}</p>
      </div>
        <SelectionArea className="container flex gap-3 flex-wrap pb-2 pl-2 pt-5"
          onStart={onStart}
          onMove={onMove}
          selectables=".selectable">
          {subFiles.map((folder, index) => (
            <File dataKey={index} key={index} file={folder} type={type} className="selectable"/>
          ))}
        </SelectionArea>
    </section>
  );
};

export default memo(FileSection);
