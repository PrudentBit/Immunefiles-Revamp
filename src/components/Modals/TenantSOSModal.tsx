import {useState, useEffect} from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
		AlertDialogOverlay,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import BotLeftAlert from '@/components/BotLeftAlert'
import removeAllTenantLinks from '@/utils/api/sosTenantLinks'

type Props = {
	user?: AdminSpecificUserType
}

const TenantSOSModal = ({user}: Props) => {
	
	const [sosAppliedSuccessfully, setSosAppliedSuccessfully] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [buttonHeld, setButtonHeld] = useState(false);

  const startProgress = () => {
    const id = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.01;
        return newProgress;
      });
    }, 10);
    setIntervalId(id);
  };

  const stopProgress = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setProgress(0);
  };

  useEffect(() => {
    if (progress >= 3) {
      stopProgress();
      setButtonHeld(true)
      handleSOS();
    }
  }, [progress]);

  const handleSOS = async () => {
    try {
      const result = await removeAllTenantLinks();
      if (result.success) {
        setSosAppliedSuccessfully(true);
        setTimeout(() => setSosAppliedSuccessfully(false), 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="w-[40%] h-8 bg-transparent text-red-500 border-[1px] border-solid border-red-500 hover:text-white"
          >
            Apply SOS
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='w-[35vw] pt-4'>
          <AlertDialogHeader className='flex flex-row items-center justify-between'>
            <div className='flex gap-3'>
              <div className='rounded-full w-9 h-9 flex items-center justify-center bg-[#FFEBEB]'>
                <Image src="/warning-icon.svg" width={14} height={14}  alt='restrict'/>
              </div>
              <div className="flex flex-col h-full">
                <AlertDialogTitle className='font-medium text-[0.9rem]'>Do you want to expire all the links on this domain?</AlertDialogTitle>
                <AlertDialogDescription className='text-xs'>
                  Only apply SOS when you find suspicious activity. 
                </AlertDialogDescription>
              </div>  
            </div>
            <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
              <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
            </AlertDialogCancel>
          </AlertDialogHeader>
					<AlertDialogDescription className='h-[12rem] flex items-center justify-between px-10 gap-4'>
            
            {buttonHeld ? (
              <Button 
                className='h-[10rem] p-0 w-[10rem] flex items-center justify-center bg-[#FF6161] hover:bg-[#FF6161] flex-col border-2 border-solid border-[#FF6161] rounded-[2.5rem]'
              >
                <p className='text-white font-semibold text-lg'>SOS Applied</p>
              </Button>
            ):(
              <Button 
                className='h-[10rem] p-0 w-[10rem] flex items-center justify-center bg-white flex-col border-2 border-solid border-[#FF6161] rounded-[2.5rem]'
                onMouseDown={startProgress}
                onMouseUp={stopProgress}
                onTouchStart={startProgress}
                onTouchEnd={stopProgress}
                style={{
                  background: `linear-gradient(to top, #FF6161 ${progress * 33.33}%, transparent ${progress * 33.33}%, transparent 100%)`,
                }}
              >
                <p className={`font-semibold text-lg text-${progress >= 1.6 ? 'white' : '[#FF6161]' }`}>Apply SOS</p>

                <p className={`text-xs font-normal text-${progress >= 1.3 ? 'gray-100' : 'gray-400' }`}>click & hold for 3s to apply</p>
              </Button>
            )}

					</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>

      {sosAppliedSuccessfully && (
        <BotLeftAlert image="/delete-icon.svg" imagebg="bg-[#FFE3E5]">
          <div className="flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]">
            <p className="text-[#FF6161] font-semibold text-base leading-4  ">
              SOS applied successfully
            </p>
            <p className="text-[#979797] font-[400] text-sm leading-[1.1rem]">
              All links have been expired.
            </p>
          </div>
        </BotLeftAlert>
      )}
    </>
  );
};

export default TenantSOSModal;
