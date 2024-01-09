"use client";

import { useEffect, useState } from 'react'
import LinksRow from './LinksRow'
import { toast } from 'sonner'
import getSharedLinks from '@/utils/api/getSharedLinksAPI';

const Links = () => {
  const [links, setLinks] = useState<sharedLinksType[]>([]);

  useEffect(() => {
    const getLinks = async () => {
      const response = await getSharedLinks();
      if (response.status === 200) {
        setLinks(response.data);
        console.log(response.data);
      } else {
        toast.error('Failed to fetch links',{
          description: response.data.message
        });
      }
    }
    getLinks();
  }, []);

  return (
    <div className='h-full flex flex-col gap-4 justify-between items-center'>
      <div className='w-full h-[31rem] flex flex-col gap-4 mt-3 pr-2 overflow-auto'>
        {links.map((link, index) => (
          <LinksRow key={index} link={link}/>
        ))}
      </div>
    </div>
  )
}

export default Links