import React from 'react'
import Image from 'next/image'
import RequestForm from './RequestForm';

type Request = {
  id: string;
  fileName: string;
  email: string;
  isEmailValid: boolean;
  requestType: string;
};


type Props = {
  requests: Request[];
  setRequests: (value: Request[]) => void;
  requestType: 'internal' | 'external';
  setRequestType: (value: 'internal' | 'external') => void;
}

const RequestFileSection = ({requests, setRequests, requestType, setRequestType}: Props) => {
  return (
    <div className='flex flex-col h-[18rem] border-[1px] border-solid border-primary_font_2 rounded-lg'>

      <div className='flex h-8 border-b-[1px] border-primary_font_2'>
        <div 
          className={`flex items-center justify-center w-[50%] cursor-pointer rounded-tl-md ${requestType === "internal" && "bg-primary_font_2"}`}
          onClick={() => setRequestType('internal')}
        >
          <p className={`${requestType === "internal" ? "text-white" : "text-primary_font"} font-normal text-sm`}>Internal request</p>
        </div>

        <div 
          className={`flex items-center justify-center w-[50%] cursor-pointer rounded-tr-md ${requestType === "external" && "bg-primary_font_2"}`}
          onClick={() => setRequestType('external')}
        >
          <p className={`${requestType === "external" ? "text-white": "text-primary_font"} font-normal text-sm`}>External request</p>
        </div>
      </div>

      <div className='flex flex-col gap-3 p-3 h-[15.8rem] overflow-y-auto'>
        {requests.filter(request => request.requestType === requestType).map((request, index) => (
          <RequestForm
            key={index}
            request={request}
            requests={requests}
            setRequests={setRequests}
          />
        ))}
      </div>
    </div>
  )
}

export default RequestFileSection
