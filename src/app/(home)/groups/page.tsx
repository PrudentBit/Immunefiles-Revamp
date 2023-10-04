import React from 'react'
import SearchBar from '@/components/SearchBar'

const Group = () => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <SearchBar/>
      Groups
    </div>
  )
}

export default Group