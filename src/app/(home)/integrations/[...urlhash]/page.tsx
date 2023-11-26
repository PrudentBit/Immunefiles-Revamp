import React from 'react'
import TopNav from '@/components/TopNav'

interface FileSystemProps {
  params: {urlhash: string}
}

const Integrations: React.FC<FileSystemProps> = ({ params: { urlhash } }) => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='integrations'/>
      {urlhash}
    </div>
  )
}

export default Integrations