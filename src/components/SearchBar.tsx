"use client"

import React from 'react'
import Image from 'next/image'

const SearchBar = () => {
    return (
        <div className='border-solid rounded-[1.2rem] border-2 border-primary_border px-4 py-2 w-[75%]'>
            <form action="" className='flex items-center gap-4 w-full h-8 justify-between'>
                <button className='focus:outline-none'>
                    <Image src="/search.png" alt='search' width={20} height={25}/>
                </button>
                <input type="text" placeholder='Search..' className='h-full w-[80%] focus:outline-none'/>

                <div className='h-full border-primary_border border'/>

                <select name="fileSystem" id="fileSystemFilter" className='font-semibold w-[15%] min-w-[7rem] text-[15px] text-primary_font focus:outline-none'>
                    <option value="file">File System</option>
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                </select>
            </form>
        </div>
    )
}

export default SearchBar