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
