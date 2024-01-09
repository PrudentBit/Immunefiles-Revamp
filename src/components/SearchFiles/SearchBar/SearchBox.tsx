import { useState } from "react"
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

  const handleSearch = () => {
    setValue("")
    console.log(value)
  }

  return (
    <Popover>
      <PopoverTrigger className='flex items-center gap-2 border-solid rounded-[1.2rem] border-2 border-primary_border px-4 py-2 w-[75%]'>
        <Image src="/search.png" alt='search' width={20} height={25}/>
        <p className='w-full text-left text-gray-400'>Search...</p>
        <p className="text-gray-400 whitespace-nowrap pr-2"> (ctrl+k) </p>
      </PopoverTrigger>
      <PopoverContent className="w-[55vw] min-w-[38rem] h-[29rem] py-6 px-8 rounded-3xl flex flex-col gap-5">
        <Command className="h-10 min-h-[2rem]">
          <CommandInput onChangeCapture={()=>handleSearch} placeholder="Enter search term..." className="h-9" />
        </Command>

        <div className="flex flex-col gap-4">
          <div className="flex gap-1 items-center">
            <Image src="/tags-icon.svg" alt='tag' width={16} height={16}/>
            <p className="text-primary_font  font-normal leading-4">Tags</p>
          </div>

          <SortBy allActive={allActive} groupsOnly={groupsOnly} filesOnly={filesOnly} linksOnly={linksOnly} internalOnly={internalOnly} setAllActive={setAllActive} setGroupsOnly={setGroupsOnly} setFilesOnly={setFilesOnly} setLinksOnly={setLinksOnly} setInternalOnly={setInternalOnly}/>
        </div>

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
      </PopoverContent>
    </Popover>
  )
}

export default SearchBox