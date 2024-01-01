import React from 'react';
import Image from 'next/image';

type Props = {
  folderName: string;
  setFolderName: (_value: string) => void;
};

const CreateFolderSection = ({ folderName, setFolderName }: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  return (
    <div className="flex flex-col gap-5 pt-2 h-[7rem]">
      <div className="flex gap-3 flex-col">
        <div className="flex gap-2">
          <Image
            src="/Folder-icon.svg"
            width={18}
            height={18}
            alt="Folder icon"
          />
          <p className="text-primary_font font-normal text-md">Folder Name</p>
        </div>

        <input
          type="text"
          className="p-2 px-4 w-full text-primary_font  rounded-sm bg-primary_bg"
          placeholder="Enter folder name"
          value={folderName}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CreateFolderSection;
