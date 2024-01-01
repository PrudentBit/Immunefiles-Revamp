"use client"

import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import Image from "next/image"

import { useFileAndFolderStore } from "@/utils/store/filesAndFoldersStore"
import { GroupStore } from "@/utils/store/groupDetailsStore"
import { lowerCaseExtensions } from '../../../public/FileIcons/fileExtensions';
import { useRouter } from "next/navigation"
import { selectedFilesStore } from "@/utils/store/selectFilesStore"

type sortType = 'files' | 'groups' | 'links' | 'internal' | 'all';

export function CommandBox() {
  const [open, setOpen] = useState(false);
  const [allActive, setAllActive] = useState(true);
  const [groupsOnly, setGroupsOnly] = useState(false);
  const [filesOnly, setFilesOnly] = useState(false);  
  const [linksOnly, setLinksOnly] = useState(false);
  const [internalOnly, setInternalOnly] = useState(false);
  const [files, folders] = useFileAndFolderStore((state) => [
    state.files,
    state.folders,
  ])
  const [groupDetails] = GroupStore((state) => [
    state.groups
  ])
  const router = useRouter();
  const [removeAllFiles, addFile] = selectedFilesStore((state) => [
    state.removeAllFiles,
    state.addFile
  ]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const getIcon = (name: string) => {
    const extension = name.split('.').pop() || '';
    const iconSrc =lowerCaseExtensions.includes(extension)
      ? `/FileIcons/${extension}.svg`
      : '/FileIcons/unknown.png';
    return iconSrc;
  }

  const handleFileClick = (file: FileOrFolderType) => {
    return () => {
      removeAllFiles();
      addFile(file)
      router.push(`/filesystem/${file.path || "root"}`);
      setOpen(false);
    }
  }

  const handleGroupClick = () => {
    return () => {
      router.push(`/groups`);
      setOpen(false);
    }
  }

  const handleSort = (type: sortType) => {
    switch(type) {
      case 'files':
        setFilesOnly(prev => !prev);
        break;
      case 'groups':
        setGroupsOnly(prev => !prev);
        break;
      case 'links':
        setLinksOnly(prev => !prev);
        break;
      case 'internal':
        setInternalOnly(prev => !prev);
        break;
      case 'all':
        setAllActive(true);
        setFilesOnly(false);
        setGroupsOnly(false);
        setLinksOnly(false);
        setInternalOnly(false);
        break;
      default:
        break;
    }
  }
  
  useEffect(() => {
    if (!(filesOnly || groupsOnly || linksOnly || internalOnly)) {
      setAllActive(true);
    } else {
      setAllActive(false);
    }
  }, [filesOnly, groupsOnly, linksOnly, internalOnly]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen} className="w-[40vw] min-w-[30vw] h-[48vh] backdrop-blur-none">
        <CommandInput placeholder="Type a file name to search..." />
        <div className="w-full max-h-[7vh] flex items-center justify-between p-2 px-6">
          <button onClick={()=> handleSort('all')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${allActive && "bg-primary_font text-white"}`}>
            <span className="font-medium text-sm">Search all</span>
          </button>

          <button onClick={()=> handleSort('files')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${filesOnly && "bg-primary_font text-white"}`}>
            <span className="font-medium text-sm">File System</span>
          </button>

          <button onClick={()=> handleSort('groups')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${groupsOnly && "bg-primary_font text-white"}`}>
            <span className="font-medium text-sm">Groups</span>
          </button>

          <button onClick={()=> handleSort('links')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${linksOnly && "bg-primary_font text-white"}`}>
            <span className="font-medium text-sm">Links</span>
          </button>

          <button onClick={()=> handleSort('internal')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${internalOnly && "bg-primary_font text-white"}`}>
            <span className="font-medium text-sm">Internal Share</span>
          </button>
        </div>
        <hr/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>  

          {(filesOnly || allActive) && (
            <>
              <CommandGroup>
                {folders.map((folder) => (
                  <CommandItem key={folder.urlhash} className="flex gap-[0.6rem]">
                    <Image src="/Folder-icon-filled.svg" height={20} width={20} alt="temp"></Image>
                    <span className="w-[70%] truncate mr-16" onClick={handleFileClick(folder)}>{folder.name}</span>

                    <div className="w-16 p-1 rounded-full flex items-center justify-center border-[1px] border-solid border-primary_font">
                      <p className='text-primary_font_2 text-xs font-normal leading-4'>Folder</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator/>
              <CommandGroup >
                {files.map((file) => (
                  <CommandItem key={file.urlhash} className="flex gap-2" >
                    <Image src={getIcon(file.name)} height={22} width={22} alt="temp"></Image>
                    <span className="w-[70%] truncate mr-16" onClick={handleFileClick(file)}>{file.name}</span>

                    <div className="w-16 p-1 rounded-full flex items-center justify-center border-[1px] border-solid border-primary_font">
                      <p className='text-primary_font_2 text-xs font-normal leading-4'>File</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
          
        </CommandList>
      </CommandDialog>
    </>
  )
}
