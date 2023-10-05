"use client"

import React from 'react'
import Image from 'next/image'

const SearchBar = () => {
    return (
        <div className='border-solid rounded-[1.2rem] border-2 border-primary_border px-8 py-2 w-[75%]'>
            <form action="" className='flex items-center gap-4 w-full h-8 justify-between'>
                <button className='focus:outline-none'>
                    <Image src="/search.png" alt='search' width={30} height={30}/>
                </button>
                <input type="text" placeholder='Search..' className='h-full w-full focus:outline-none'/>

                <div className='h-full border-primary_border border mx-[4vw]'/>

                <select name="fileSystem" id="fileSystemFilter" className='font-semibold text-[15px] text-primary_font focus:outline-none'>
                    <option value="file">File System</option>
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                </select>
            </form>
        </div>
    )
}

export default SearchBar