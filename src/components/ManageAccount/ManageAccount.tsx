import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import General from './General'

type Props = {}

const ManageAccount = (props: Props) => {
  return (
    <div className='w-full h-full pt-4 flex flex-col gap-6'>
      <p className='text-xl h-[5%]'>ManageAccount</p>

      <Tabs defaultValue="General" className="w-full h-full">
        <TabsList className='bg-transparent z-10 gap-8 rounded-none p-0'>
          <TabsTrigger value="General" className='w-[7rem] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-primary '>General</TabsTrigger> 
          <TabsTrigger value="Groups" className='w-[7rem] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-primary '>Groups</TabsTrigger> 
          <TabsTrigger value="Links" className='w-[7rem] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-primary '>Links</TabsTrigger> 
          <TabsTrigger value="Appearance" className='w-[7rem] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-primary '>Appearance</TabsTrigger> 
        </TabsList>
        <hr className='w-full h-4 relative translate-y-[-2px] z-[-10]'/>
        <TabsContent value="General" className='w-full'>
          <General/>
        </TabsContent>
        <TabsContent value="Groups">
          groups
        </TabsContent>
        <TabsContent value="Links">
          links
        </TabsContent>
        <TabsContent value="Appearance">
          appearance
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ManageAccount