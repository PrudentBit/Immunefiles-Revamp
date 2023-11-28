import DriveCard from './DriveCard'

const IntegrationsMain = () => {

  return (
    <div className='h-full w-full flex gap-10 p-2'>
      <DriveCard name='Google Drive' image='/google-drive.svg' gradient='bg-gradient-to-b from-green-700 via-blue-600 to-yellow-400'/>

      <DriveCard name='One Drive' image='/one-drive.svg' gradient='bg-gradient-to-b from-gray-400 via-blue-400 to-blue-500'/>
    </div>
  )
}

export default IntegrationsMain