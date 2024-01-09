import Image from "next/image"
import { lowerCaseExtensions } from '../../../../../public/FileIcons/fileExtensions';


const FileRow = () => {

  const getIcon = (name: string) => {
    const extension = name.split('.').pop() || '';
    const iconSrc =lowerCaseExtensions.includes(extension)
      ? `/FileIcons/${extension}.svg`
      : '/FileIcons/unknown.png';
    return iconSrc;
  }

  return (
    <div className="flex p-2 px-5 items-center justify-between gap-4 rounded-xl border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF]">
      <Image src={getIcon("abc.docx")} height={28} width={28} alt="temp"/>

      <p className="w-[70%] truncate mr-16 text-primary_font_2 cursor-pointer">kufy</p>

      <div className="flex justify-between items-center gap-4">
        <button title="Details" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#E5EDFF] hover:bg-[#C4D5FB]">
          <Image src="/details-icon-2.svg" alt='details' width={18} height={18}/>
        </button>
        <button title="Download" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#D0FFE3] hover:bg-[#ABEDC6]">
          <Image src="/download-icon-green.svg" alt='download' width={18} height={18}/>
        </button>
      </div>
    </div>
  )
}

export default FileRow