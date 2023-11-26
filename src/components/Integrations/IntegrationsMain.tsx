import Image from 'next/image'
import DriveCard from './DriveCard'

type Props = {}

const IntegrationsMain = (props: Props) => {

  return (
    <div className='h-full w-full flex gap-10 p-2'>
      <DriveCard name='Google Drive' image='/google-drive.svg' shadow='0px_4px_30px_0px_rgba(58,186,110,0.25)' gradient='bg-gradient-to-b from-green-700 via-blue-600 to-yellow-400'/>

      <DriveCard name='One Drive' image='/one-drive.svg' shadow='0px_4px_30px_0px_rgba(75,123,229,0.25)' gradient='bg-gradient-to-b from-gray-400 via-blue-400 to-blue-500'/>
    </div>
  )
}

export default IntegrationsMain