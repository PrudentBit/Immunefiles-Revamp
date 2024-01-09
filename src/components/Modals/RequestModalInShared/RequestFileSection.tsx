import Image from 'next/image';
import InternalRequest from './InternalRequest';
import ExternalRequest from './ExternalRequest';

type Request = {
  id: string;
  fileName: string[];
  email: string;
  requestType: string;
};

type Props = {
  request: Request;
  setRequest: React.Dispatch<React.SetStateAction<Request>>;
  requestType: 'internal' | 'external' | 'none';
  setRequestType: (_value: 'internal' | 'external' | 'none') => void;
};

const RequestFileSection = ({
  request,
  setRequest,
  requestType,
  setRequestType,
}: Props) => {

  const handleClickOption = (type: 'internal' | 'external') => {
    setRequestType(type);
    setRequest({id:'', fileName: [""], email: '', requestType : type});
  }
  
  return (
    <div className='w-full h-[15rem]'>
      {requestType === 'none' ? (
        <div className='w-full h-full flex justify-between'>
          <div 
            className='h-[15rem] w-[15rem] flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-[#E5EDFF] border border-solid border-primary_border rounded-2xl'
            onClick={() => handleClickOption('internal')}
          >
            <Image src='/enter-icon.svg' width={45} height={45} alt='Internal' />
            <p>Internal Request</p>
          </div>

          <div 
            className='h-[15rem] w-[15rem] flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-[#E5EDFF] border border-solid border-primary_border rounded-2xl'
            onClick={() => handleClickOption('external')}
          >
            <Image src='/exit-icon.svg' width={35} height={35} alt='Internal' />
            <p>External Request</p>
          </div>
        </div>
      ):(
        <>
          {requestType ==='internal' ? (
            <InternalRequest request={request} setRequest={setRequest} setRequestType={setRequestType}/>
          ):(
            <ExternalRequest request={request} setRequest={setRequest} setRequestType={setRequestType}/>
          )}
        </>
      )}
    </div>
  );
};

export default RequestFileSection;
