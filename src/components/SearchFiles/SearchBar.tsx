"use client"

import Image from "next/image"

const SearchBar = () => {
  return (
    <div className='flex items-center gap-2 border-solid rounded-[1.2rem] border-2 border-primary_border px-4 py-2 w-[75%]'>
      <button>
        <Image src="/search.png" alt='search' width={20} height={25}/>
      </button>
      <input type="text" placeholder='Search..' className='w-full'/>

      <p className="text-gray-400 whitespace-nowrap">( ctrl+k )</p>
    </div>
  )
}

export default SearchBar

// import * as React from "react"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// export function SearchBar() {
//   const [open, setOpen] = React.useState(false)
//   const [value, setValue] = React.useState("")

//   return (
//     <div>
//       <Command>
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild className="w-10">
//             <input 
//               placeholder="Search framework..." 
//               className="w-10"
//               onChange={(e) => {
//                 setValue(e.target.value)
//                 if (e.target.value !== "") {
//                   setOpen(true)
//                 } else {
//                   setOpen(false)
//                 }
//               }}
//             />
//           </PopoverTrigger>
//           <PopoverContent className="w-[200px] p-0">
//             <CommandEmpty>No framework found.</CommandEmpty>
//             <CommandGroup>
//               <CommandItem>React</CommandItem>
//               <CommandItem>Vue</CommandItem>
//               <CommandItem>Angular</CommandItem>
//               <CommandItem>Ember</CommandItem>
//               <CommandItem>Svelte</CommandItem>
//             </CommandGroup>
//           </PopoverContent>
//         </Popover>
//       </Command>
//     </div>
//   )
// }

// export default SearchBar
