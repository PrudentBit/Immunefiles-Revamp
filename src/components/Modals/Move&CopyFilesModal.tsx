'use client';

import React from 'react';
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
import { Button } from '@/components/ui/button';

import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import moveFiles from '@/utils/api/movefilesAPI';
import copyFiles from '@/utils/api/copyFilesAPI';
import getFiles from '@/utils/api/getFilesAPI';
import { decryptData } from '@/utils/helper/decryptFiles';
import BotLeftAlert from '@/components/BotLeftAlert';
import SelectedFilesDisplay from '@/components/Modals/Modal-components/SelectedFilesDisplay';

type Props = {
  multiplefiles: boolean;
  moveORcopy: string;
  currFile?: FileOrFolderType;
};

const MoveOrCopyFilesModal = ({
  multiplefiles,
  moveORcopy,
  currFile,
}: Props) => {
  const [file, removeFile, removeAllFiles, addFile] = selectedFilesStore(
    (state) => [
      state.files,
      state.removeFile,
      state.removeAllFiles,
      state.addFile,
    ]
  );
  const [selectedFolder, setSelectedFolder] = React.useState<string>('');
  const [root, setRoot] = React.useState<string>('');
  const [folderStack, setFolderStack] = React.useState<string[]>([]);
  const [folders, setFolders] = React.useState<FileOrFolderType[]>([]);
  const [path, setPath] = React.useState<string[]>([]);
  const [pathName, setPathName] = React.useState<string[]>([]);
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [
    state.toggleForceRefresh,
  ]);

  const removeFileFromSelection = (indexToRemove: number) => {
    removeFile(file[indexToRemove].urlhash);
  };

  const [apiSuccess, setApiSuccess] = React.useState<boolean>(false);

  const handleMoveClick = async () => {
    if (moveORcopy === 'Move') {
      const filesHash = file.map((item) => item.urlhash);
      const result = await moveFiles(filesHash, '', selectedFolder);
      if (result.success) {
        console.log('Files moved successfully');
        setApiSuccess(true);
        toggleForceRefresh();
        removeAllFiles();
      } else {
        console.error('Error moving files', result.data.error);
      }
    } else {
      const filesHash = file.map((item) => item.urlhash);
      const result = await copyFiles(filesHash, [], selectedFolder);
      if (result.success) {
        console.log('Files copied successfully');
        setApiSuccess(true);
        toggleForceRefresh();
        removeAllFiles();
      } else {
        console.error('Error copying files', result.data.error);
      }
    }
  };

  const closeModal = () => {
    setFolders([]);
    setPath([]);
    setPathName([]);
    setSelectedFolder('');
    setFolderStack([]);
    setRoot('');
    console.log('close modal');
  };

  const traverseFile = (urlhash: string) => {
    setRoot(urlhash);
    setSelectedFolder(urlhash);
    setFolderStack([...folderStack, urlhash]);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getFiles(root);
      const decryptedData = decryptData(data.ciphertext);
      setFolders(decryptedData.children);
      setPath(decryptedData.hash_path);
      setPathName(decryptedData.path);
    };

    fetchData();
  }, [root]);

  const onOpenWithThreeDots = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (currFile) {
      addFile(currFile);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {multiplefiles ? (
            <Image
              src={`/${moveORcopy.toLowerCase()}-icon.svg`}
              onClick={(e) => e.stopPropagation()}
              width={19}
              height={19}
              alt={`${moveORcopy} icon`}
            />
          ) : (
            <p onClick={(e) => onOpenWithThreeDots(e)} className="w-full">
              {moveORcopy}
            </p>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[45rem]">
          <AlertDialogHeader className="flex flex-row h-10 justify-between">
            <AlertDialogTitle className="font-bold text-xl text-black mt-1 pt-[0.3rem]">
              {moveORcopy} Content
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

          <AlertDialogDescription className="text-[#7A7AFF] text-md flex flex-col justify-center h-[25rem] gap-4">
            <SelectedFilesDisplay
              file={file}
              removeFileFromSelection={removeFileFromSelection}
            />

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
                      <p className="text-gray-700 font-medium">My home </p>
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
                          src="/folder-icon.svg"
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
                            src="/folder-icon.svg"
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
                src="/add_folder-icon.svg"
                width={18}
                height={18}
                alt="Add folder icon"
              />
              <p className=" text-[#7A7AFF] font-medium text-sm">
                Create Folder
              </p>
            </button>
            {selectedFolder ? (
              <AlertDialogAction
                onClick={handleMoveClick}
                className="rounded-full text-white font-semibold bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font"
              >
                {moveORcopy} here
              </AlertDialogAction>
            ) : (
              <Button
                title="Select Folder"
                className="rounded-full font-medium bg-white border-2 border-solid border-gray text-gray-500"
              >
                {moveORcopy} here
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {apiSuccess && (
        <BotLeftAlert image="/task-completed-icon.svg" imagebg="bg-[#E5EDFF]">
          <div className="flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]">
            <p className="text-primary_font font-semibold text-base leading-4  ">
              Files {moveORcopy === 'Move' ? 'Moved' : 'Copied'} successfully
            </p>
            <p className="text-[#979797] font-[400] text-sm leading-[1.1rem]">
              you can now view your {moveORcopy === 'Move' ? 'moved' : 'copied'}{' '}
              items in file system.
            </p>
          </div>
          <button
            onClick={() => {
              setApiSuccess(false);
              removeAllFiles();
            }}
            className="text-primary_font px-2 mb-8 text-lg"
          >
            x
          </button>
        </BotLeftAlert>
      )}
    </>
  );
};

export default MoveOrCopyFilesModal;
