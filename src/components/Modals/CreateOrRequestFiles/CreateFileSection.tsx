import React from 'react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  fileName: string;
  setFileName: (value: string) => void;
  selectedExtension: string;
  setSelectedExtension: (value: string) => void;
}

const CreateFileSection = ({fileName, setFileName, selectedExtension, setSelectedExtension}: Props) => {
  const fileExtensions = [
    'acc', 'avi', 'bmp', 'crd', 'csv', 'dll', 'dmg', 'doc', 'docx', 'dwg','eps', 
    'exe', 'flv', 'gif', 'iso', 'jpeg', 'jpg', 'mid', 'mkv', 'mp3', 'mp4', 
    'mpeg', 'ogg', 'pcm', 'pdf', 'png', 'ppt', 'psd', 'rar', 'raw',
    'svg', 'tiff', 'txt', 'wav', 'wma', 'xsl', 'zip'
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleSelectChange = (extension: string) => {
    setSelectedExtension(extension);
  };
  
  return (
    <div className='flex flex-col gap-5 pt-2 h-[7rem]'>
      <div className='flex gap-3 flex-col'>
        <div className='flex gap-2'>
          <Image src='/file-icon.svg' width={18} height={18} alt='File icon'/>
          <p className='text-primary_font font-normal text-md'>File Name</p>
        </div>

        <div className='flex gap-2'>
          <input 
            type="text" 
            className='p-2 px-4 w-full text-primary_fontrounded-sm bg-bg_hover'
            placeholder='Enter file name'
            value={fileName}
            onChange={handleInputChange}
          />

          <DropdownMenu>
            <DropdownMenuTrigger title='Select File Type' className='p-2 px-6 flex gap-3 items-center text-primary_font rounded-sm bg-bg_hover'>
              {'.' + selectedExtension}
              <Image src='/down-arrow.svg' width={12} height={12} alt='Down arrow' className='pt-1'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='h-[15rem] overflow-auto'>
              {fileExtensions.map((extension, index) => (
                <DropdownMenuItem key={index} title={extension} onClick={() => handleSelectChange(extension)}>{'.' + extension}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </div>
  )
}

export default CreateFileSection
