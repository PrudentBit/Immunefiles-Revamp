import { useState, useEffect } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import { lowerCaseExtensions } from '../../../public/FileIcons/fileExtensions';
import { Button } from "../ui/button";

type sortType = 'files' | 'groups' | 'links' | 'internal' | 'all';

const SearchBox = () => {
  const [allActive, setAllActive] = useState(true);
  const [groupsOnly, setGroupsOnly] = useState(false);
  const [filesOnly, setFilesOnly] = useState(false);  
  const [linksOnly, setLinksOnly] = useState(false);
  const [internalOnly, setInternalOnly] = useState(false);

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

  const getIcon = (name: string) => {
    const extension = name.split('.').pop() || '';
    const iconSrc =lowerCaseExtensions.includes(extension)
      ? `/FileIcons/${extension}.svg`
      : '/FileIcons/unknown.png';
    return iconSrc;
  }

  return (
    <Popover>
      <PopoverTrigger className='flex items-center gap-2 border-solid rounded-[1.2rem] border-2 border-primary_border px-4 py-2 w-[75%]'>
        <Image src="/search.png" alt='search' width={20} height={25}/>
        <input type="text" placeholder='Search..' className='w-full'/>
      </PopoverTrigger>
      <PopoverContent className="w-[50rem] h-[27rem] py-6 px-8 rounded-3xl flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <Image src="/tags-icon.svg" alt='tag' width={16} height={16}/>
                <p className="text-primary_font  font-normal leading-4">Tags</p>
              </div>
              <button className="flex gap-2 rounded-full items-center justify-center p-[0.3rem] px-2 bg-[#FFE3E5] hover:bg-[#FBD2D5]">
                <Image src="/close-icon-2.svg" alt='close' width={10} height={10} className="pt-[0.1rem]"/>
                <p className="text-red-400 font-normal text-sm leading-3">clear tags</p>
              </button>
            </div>
          </div>
          <div className="w-full max-h-[7vh] flex items-center gap-4">
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
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-1 items-center">
            <Image src="/recent-icon.svg" alt='Recent' width={16} height={16}/>
            <p className="text-primary_font  font-normal leading-4">Recent Searches</p>
          </div>

          <div className="flex flex-col gap-3 overflow-auto h-[14rem]">
            <div className="flex p-2 px-5 items-center justify-between gap-4 rounded-xl border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF]">
              <Image src={getIcon("abc.docx")} height={28} width={28} alt="temp"/>

              <p className="w-[70%] truncate mr-16 text-primary_font_2">kufy</p>

              <div className="flex justify-between items-center gap-4">
                <button title="Share" className="h-7 w-7 rounded-full flex items-center justify-center bg-bg_hover hover:bg-[#D5D5FD]">
                  <Image src="/share-icon-purple.svg" alt='share' width={18} height={18}/>
                </button>
                <button title="Details" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#E5EDFF] hover:bg-[#C4D5FB]">
                  <Image src="/details-icon-2.svg" alt='details' width={18} height={18}/>
                </button>
                <button title="Download" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#D0FFE3] hover:bg-[#ABEDC6]">
                  <Image src="/download-icon-green.svg" alt='download' width={18} height={18}/>
                </button>
              </div>
            </div>
            <div className="flex p-2 px-5 items-center justify-between gap-4 rounded-xl border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF]">
              <Image src={getIcon("abc.docx")} height={28} width={28} alt="temp"/>

              <p className="w-[70%] truncate mr-16 text-primary_font_2">kufy</p>

              <div className="flex justify-between items-center gap-4">
                <button title="Share" className="h-7 w-7 rounded-full flex items-center justify-center bg-bg_hover hover:bg-[#D5D5FD]">
                  <Image src="/share-icon-purple.svg" alt='share' width={18} height={18}/>
                </button>
                <button title="Details" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#E5EDFF] hover:bg-[#C4D5FB]">
                  <Image src="/details-icon-2.svg" alt='details' width={18} height={18}/>
                </button>
                <button title="Download" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#D0FFE3] hover:bg-[#ABEDC6]">
                  <Image src="/download-icon-green.svg" alt='download' width={18} height={18}/>
                </button>
              </div>
            </div>
            <div className="flex p-2 px-5 items-center justify-between gap-4 rounded-xl border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF]">
              <Image src={getIcon("abc.docx")} height={28} width={28} alt="temp"/>

              <p className="w-[70%] truncate mr-16 text-primary_font_2">kufy</p>

              <div className="flex justify-between items-center gap-4">
                <button title="Share" className="h-7 w-7 rounded-full flex items-center justify-center bg-bg_hover hover:bg-[#D5D5FD]">
                  <Image src="/share-icon-purple.svg" alt='share' width={18} height={18}/>
                </button>
                <button title="Details" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#E5EDFF] hover:bg-[#C4D5FB]">
                  <Image src="/details-icon-2.svg" alt='details' width={18} height={18}/>
                </button>
                <button title="Download" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#D0FFE3] hover:bg-[#ABEDC6]">
                  <Image src="/download-icon-green.svg" alt='download' width={18} height={18}/>
                </button>
              </div>
            </div>
            <div className="flex p-2 px-5 items-center justify-between gap-4 rounded-xl border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF]">
              <Image src={getIcon("abc.docx")} height={28} width={28} alt="temp"/>

              <p className="w-[70%] truncate mr-16 text-primary_font_2">kufy</p>

              <div className="flex justify-between items-center gap-4">
                <button title="Share" className="h-7 w-7 rounded-full flex items-center justify-center bg-bg_hover hover:bg-[#D5D5FD]">
                  <Image src="/share-icon-purple.svg" alt='share' width={18} height={18}/>
                </button>
                <button title="Details" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#E5EDFF] hover:bg-[#C4D5FB]">
                  <Image src="/details-icon-2.svg" alt='details' width={18} height={18}/>
                </button>
                <button title="Download" className="h-7 w-7 rounded-full flex items-center justify-center bg-[#D0FFE3] hover:bg-[#ABEDC6]">
                  <Image src="/download-icon-green.svg" alt='download' width={18} height={18}/>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-10 flex justify-end">
          <Button className="rounded-full h-7 bg-[#E5EDFF] text-primary_font font-medium text-sm">Show more</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SearchBox