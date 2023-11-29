import Image from 'next/image';
import Request from './Request';

type Props = {
  requests: RequestsType
  setReload: (reload: boolean) => void
}

const PendingRequests = ({requests, setReload}: Props) => {
  return (
    <div className='flex flex-col gap-5'>
        <div className='flex gap-2'>
          <Image src='/request-icon-blue.svg' width={20} height={20} alt='pending'/>
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">Pending requests</p>
        </div>

        <div className='flex gap-3 flex-wrap'>
          {requests.map((request) => (
            <Request key={request.request_hash} request={request} setReload={setReload}/>
          ))}
        </div>
      </div>
  )
}

export default PendingRequests