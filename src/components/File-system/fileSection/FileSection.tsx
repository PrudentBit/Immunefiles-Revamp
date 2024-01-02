import {useState, memo} from 'react';
import Image from "next/image";
import SelectionArea, {SelectionEvent} from '@viselect/react';
import File from "@/components/File-system/File";
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import GroupFile from '@/components/Groups/GroupFile';

type FileSectionProps = {
  subFiles: FileOrFolderType[] | groupFileandFolderType[];
  type: string;
  group_hash?: string;
}

const FileSection = ({ subFiles, type, group_hash}: FileSectionProps) => {
  const sectionType = type === "folder" ? "Folders" : "Files";
  console.log(type, sectionType);
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
  console.log(sectionType, 'subFiles', subFiles);

  const isFileAndFolderType = (file: FileOrFolderType | groupFileandFolderType): file is FileOrFolderType => {
    console.log((file as FileOrFolderType).owner !== undefined)
    return (file as FileOrFolderType).owner !== undefined;
  };

  return (
    <SelectionArea  
      className="flex flex-col" 
      onStart={onStart}
      onMove={onMove}
      selectables=".selectable"
    >
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
      <div className="container flex gap-3 flex-wrap pb-2 pl-2 pt-5">
        {subFiles.map((file, index) => (
          isFileAndFolderType(file) ? (
            <File dataKey={index} key={index} file={file} type={type} className="selectable"/>
          ) : (
            <>
              {group_hash && (
                <GroupFile dataKey={index} key={index} file={file} type={type} group_hash={group_hash} className="selectable"/>
              )}
            </>
          )
        ))}
      </div>  
    </SelectionArea>
  );
};

export default memo(FileSection);
