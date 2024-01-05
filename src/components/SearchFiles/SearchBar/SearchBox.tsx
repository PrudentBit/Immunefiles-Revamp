import { useState, useEffect } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import SortBy from "./SortBy"
import FileRow from "./Rows/FileRow";
import GroupRow from "./Rows/GroupRow";
import LinkRow from "./Rows/LinkRow";
import {
  Command,
  CommandInput,
} from "@/components/ui/command"

const SearchBox = () => {
  const [allActive, setAllActive] = useState(true);
  const [groupsOnly, setGroupsOnly] = useState(false);
  const [filesOnly, setFilesOnly] = useState(false);  
  const [linksOnly, setLinksOnly] = useState(false);
  const [internalOnly, setInternalOnly] = useState(false);
  const [value, setValue] = useState("")

  const handleSearch = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <Popover>
      <PopoverTrigger className='flex items-center gap-2 border-solid rounded-[1.2rem] border-2 border-primary_border px-4 py-2 w-[75%]'>
        <Image src="/search.png" alt='search' width={20} height={25}/>
        <input type="text" placeholder='Search..' className='w-full'/>
        <p className="text-gray-400 whitespace-nowrap pr-2"> (ctrl+k) </p>
      </PopoverTrigger>
      <PopoverContent className="w-[55vw] min-w-[38rem] h-[29rem] py-6 px-8 rounded-3xl flex flex-col gap-4">
        <Command className="h-10 min-h-[2rem]">
          <CommandInput onChangeCapture={(e)=>handleSearch(e)} placeholder="Search framework..." className="h-9" />
        </Command>

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <Image src="/tags-icon.svg" alt='tag' width={16} height={16}/>
                <p className="text-primary_font  font-normal leading-4">Tags</p>
              </div>
              <button className="flex gap-2 rounded-full items-center justify-center p-[0.3rem] px-2 bg-[#FFE3E5] hover:bg-[#FBD2D5]">
                <Image src="/close-icon-3.svg" alt='close' width={10} height={10} className="pt-[0.1rem]"/>
                <p className="text-red-400 font-normal text-sm leading-3">clear tags</p>
              </button>
            </div>
          </div>
        </div>

        <SortBy allActive={allActive} groupsOnly={groupsOnly} filesOnly={filesOnly} linksOnly={linksOnly} internalOnly={internalOnly} setAllActive={setAllActive} setGroupsOnly={setGroupsOnly} setFilesOnly={setFilesOnly} setLinksOnly={setLinksOnly} setInternalOnly={setInternalOnly}/>

        <div className="flex flex-col gap-4">
          <div className="flex gap-1 items-center">
            <Image src="/recent-icon.svg" alt='Recent' width={16} height={16}/>
            <p className="text-primary_font  font-normal leading-4">Recent Searches</p>
          </div>

          <div className="flex flex-col gap-3 overflow-auto h-[15rem]">
            <FileRow/>
            <GroupRow/>
            <LinkRow/>
          </div>
        </div>

        {/* <div className="w-full h-10 flex justify-end">
          <Button className="rounded-full h-7 bg-[#E5EDFF] text-primary_font font-medium text-sm">Show more</Button>
        </div> */}
      </PopoverContent>
    </Popover>
  )
}

export default SearchBox