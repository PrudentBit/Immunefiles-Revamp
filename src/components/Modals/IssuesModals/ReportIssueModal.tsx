import {useState} from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Select,
  SelectTrigger, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select'
import { useDropzone } from 'react-dropzone';

const ReportIssueModal = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
        handleFilesChange([...uploadedFiles, ...acceptedFiles]);
      }
    },
  });

  const handleFilesChange = (files: File[]) => {
    setUploadedFiles(files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='h-8 mr-4 flex gap-2 px-2 bg-[#7A7AFF] hover:bg-[#9797FF] shadow-[0px_2px_30px_rgba(0,0,0,0.16)]'>
            <Image src='/alert-icon.svg' alt='report' width={18} height={18} />
            <p className='text-base font-normal mb-1'>Report new issue</p>
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='w-[35rem] pb-4'>
          <AlertDialogHeader className='flex flex-row justify-between gap-[6.5rem]'>
            <div className='flex gap-3 items-center'>
              <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]'>
                <Image src="/headset-icon.svg" width={18} height={18}  alt='report'/>
              </div>  
              <p className='text-black font-semibold text-base'>Report issue</p>
            </div>

            <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0' onClick={(e) => e.stopPropagation()}>
              <Image src="/cross-icon-blue.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
            </AlertDialogCancel>
          </AlertDialogHeader>

          <AlertDialogDescription className='h-[20rem] mr-2 border border-solid border-[#C6D8FF] rounded-xl p-3 pr-2'>
            <div className='h-[17.5rem] w-full flex flex-col gap-4 p-2 pr-3 overflow-auto'>
              <Select>
                <SelectTrigger className='w-full h-11 flex items-center justify-between bg-primary_bg'>
                  <p className='text-gray-400 pl-2'>Select issue type</p>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                </SelectContent>
              </Select>

              <input
                type="text"
                className="p-3 px-5 w-full text-secondary_font bg-primary_bg placeholder:text-gray-400 rounded-sm border-solid border border-[#E5EDFF] focus:border-[#C8D9FF]"
                placeholder="Issue heading"
                autoComplete="off"
                id='heading'
                title='Issue heading'
              />

              <textarea
                className="p-2 px-5 min-h-[5rem] w-full text-secondary_font bg-primary_bg placeholder:text-gray-400 rounded-sm border-solid border border-[#E5EDFF] focus:border-[#C8D9FF] focus:outline-none"
                placeholder="Issue explanation"
                autoComplete="off"
                id='explanation'
                title='Issue explanation'
              />

              <p className='text-primary_font_2 text-base'>Add sceenshots</p>

              <div className='flex gap-4 flex-wrap'>
                {previews.map((preview, index) => (
                  <div key={index} className='relative'>
                    <img
                      src={preview}
                      className='rounded-lg min-h-[6rem] h-[6rem] min-w-[6rem] w-[6rem] object-contain bg-primary_bg border-solid border border-[#CDDCFF]'
                      alt="preview"
                    />
                    <div
                      className='absolute top-0 right-0 cursor-pointer p-1 bg-white rounded-full'
                      onClick={() => handleRemoveFile(index)}
                    >
                      <Image
                        src="/delete-icon.svg"
                        width={16}
                        height={16}
                        alt="remove icon"
                      />
                    </div>
                  </div>
                ))}
                <div
                  {...getRootProps()}
                  className={`w-[6rem] min-w-[6rem] h-[6rem] min-h-[6rem] cursor-pointer mr-2 bg-primary_bg rounded-lg flex justify-center items-center border-solid border border-[#CDDCFF]`}
                >
                  <input
                    {...getInputProps()}
                    type="file"
                    name="UploadFiles"
                    id="UploadFiles"
                    className="hidden"
                  />
                    <Image
                      src="/cross-icon-blue.svg"
                      width={48}
                      height={48}
                      alt="upload icon"
                      className='rotate-45'
                    />
                </div>
              </div>
            </div>

          </AlertDialogDescription>

          <AlertDialogFooter className='flex justify-end'>
            <AlertDialogAction className='rounded-full px-4 text-white font-normal text-base bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font'>Send Report</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ReportIssueModal