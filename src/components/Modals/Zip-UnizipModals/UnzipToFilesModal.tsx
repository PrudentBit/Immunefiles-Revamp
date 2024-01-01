'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import getFiles from '@/utils/api/getFilesAPI';
import { decryptData } from '@/utils/helper/decryptFiles';
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';
import { unzippingFiles } from '@/utils/api/unzippingFilesAPI';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';

type Props = {
  files: FileOrFolderType[];
  multiplefiles: boolean;
};

const UnziptoFilesAlert = ({ files, multiplefiles }: Props) => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [root, setRoot] = useState<string>('');
  const [folderStack, setFolderStack] = useState<string[]>([]);
  const [folders, setFolders] = useState<FileOrFolderType[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [pathName, setPathName] = useState<string[]>([]);
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [
    state.toggleForceRefresh,
  ]);
  const [removeAllFiles] = selectedFilesStore((state) => [
    state.removeAllFiles,
  ]);

  const traverseFile = (urlhash: string) => {
    setRoot(urlhash);
    setSelectedFolder(urlhash);
    setFolderStack([...folderStack, urlhash]);
  };

  const closeModal = () => {
    setFolders([]);
    setPath([]);
    setPathName([]);
    setSelectedFolder('');
    setFolderStack([]);
    setRoot('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFiles(root);
      const decryptedData = decryptData(data.ciphertext);
      setFolders(decryptedData.children);
      setPath(decryptedData.hash_path);
      setPathName(decryptedData.path);
    };

    fetchData();
  }, [root]);

  const handleUnzipFiles = async () => {
    const zipFile = files[0].urlhash;
    const response = await unzippingFiles([zipFile], selectedFolder);
    if (response.message === 'Success') {
      toggleForceRefresh();
      removeAllFiles();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {multiplefiles ? (
          <Image
            src="/extract-icon.svg"
            onClick={(e) => e.stopPropagation()}
            width={20}
            height={20}
            alt="extract icon"
          />
        ) : (
          <p onClick={(e) => e.stopPropagation()} className="w-full">
            Extract to
          </p>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[40rem]">
        <AlertDialogHeader className="flex flex-row h-10 justify-between">
          <AlertDialogTitle className="font-bold text-xl text-black mt-1 pt-[0.3rem]">
            Extract Content
          </AlertDialogTitle>
          <AlertDialogCancel
            className="w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0"
            onClick={(e) => {
              e.stopPropagation();
              closeModal;
            }}
          >
            <Image
              src="/cross-icon.svg"
              width={20}
              height={20}
              className="rounded-full"
              alt="close icon"
            />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-[#7A7AFF] text-md flex flex-col justify-center h-[18rem] gap-4">
          <div>
            <div className="flex gap-4 pl-4 bg-primary_bg border-[1px] items-center border-solid border-primary_border rounded-md h-12">
              <Image
                src="/FileIcons/zip.svg"
                width={28}
                height={28}
                alt="zip icon"
              />
              <p className="text-primary_font_2 text-base w-[80%] truncate">
                {files[0].name}
              </p>
            </div>
          </div>

          {!(root === '') && (
            <div className="w-full h-10 flex gap-4">
              {!(root === 'root') && (
                <button
                  className="w-10 h-10 rounded-lg bg-[#F0F0F0] flex hover:bg-gray-200 items-center justify-center"
                  onClick={(e) => {
                    const newStack = [...folderStack];
                    newStack.pop();
                    setFolderStack(newStack);
                    setRoot(newStack[newStack.length - 1]);
                    e.stopPropagation();
                  }}
                >
                  <Image
                    src="/left-arrow.svg"
                    width={20}
                    height={20}
                    alt="back"
                  />
                </button>
              )}
              <div className="w-full h-full rounded-lg bg-[#F0F0F0] flex items-center pl-2">
                {path?.map((item, index) => {
                  return (
                    <div key={index} className="flex gap-2 ml-2">
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          setRoot(item);
                        }}
                        className="text-gray-700 font-medium hover:bg-gray-200 rounded-lg cursor-pointer p-2"
                      >
                        {item === 'root' ? 'My home' : `${pathName[index]}`}
                      </p>
                      <Image
                        src="/right-arrow.svg"
                        className="pt-[0.2rem]"
                        width={8}
                        height={8}
                        alt="arrow right"
                      />
                    </div>
                  );
                })}

                {!path && (
                  <div className="flex gap-2">
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        setRoot('');
                      }}
                      className="text-gray-700 font-medium hover:bg-gray-200 rounded-lg cursor-pointer p-2"
                    >
                      My home
                    </p>
                    <Image
                      src="/right-arrow.svg"
                      className="pt-[0.2rem]"
                      width={8}
                      height={8}
                      alt="arrow right"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="w-full h-[50%] rounded-lg p-4 border-[1px] border-solid border-[#7A7AFF]">
            <div className="overflow-y-auto flex gap-3 flex-wrap h-full">
              {root === '' ? (
                <>
                  <div
                    className={`h-10 w-full mr-4 flex justify-between items-center p-2 cursor-pointer ${
                      selectedFolder === 'root'
                        ? 'bg-[#e7e7ff]'
                        : 'bg-primary_bg'
                    } rounded-md`}
                  >
                    <div
                      className="flex gap-2 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFolder('root');
                      }}
                    >
                      <Image
                        src="/Folder-icon.svg"
                        width={20}
                        height={20}
                        alt="folder icon"
                      />
                      <p className="truncate pr-2">My Home</p>
                    </div>
                    <button
                      className="shrink-0 pr-2"
                      onClick={(e) => {
                        traverseFile('root');
                        e.stopPropagation();
                      }}
                      title="Enter folder"
                    >
                      <Image
                        src="/right-arrow.svg"
                        width={8}
                        height={8}
                        alt="enter"
                      />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {folders.map((item, index) => (
                    <div
                      key={index}
                      className={`h-10 w-full mr-4 flex justify-between items-center p-2 cursor-pointer ${
                        item.urlhash === selectedFolder
                          ? 'bg-[#e7e7ff]'
                          : 'bg-primary_bg'
                      } rounded-md`}
                    >
                      <div
                        className="flex gap-2 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFolder(item.urlhash);
                        }}
                      >
                        <Image
                          src="/Folder-icon.svg"
                          width={20}
                          height={20}
                          alt="folder icon"
                        />
                        <p className="truncate pr-2">{item.name}</p>
                      </div>
                      <button
                        className="shrink-0 pr-2"
                        onClick={(e) => {
                          traverseFile(item.urlhash);
                          e.stopPropagation();
                        }}
                        title="Enter folder"
                      >
                        <Image
                          src="/right-arrow.svg"
                          width={8}
                          height={8}
                          alt="enter"
                        />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className="flex justify-between items-center w-full">
          <button className="flex gap-2 items-center rounded-full hover:bg-primary_bg px-3 py-2">
            <Image
              src="/add_Folder-icon.svg"
              width={18}
              height={18}
              alt="Add folder icon"
            />
            <p className=" text-[#7A7AFF] font-medium text-sm">Create Folder</p>
          </button>
          <AlertDialogAction
            className="rounded-full text-white font-semibold bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font"
            onClick={handleUnzipFiles}
            disabled={selectedFolder === ''}
          >
            Extract here
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnziptoFilesAlert;
