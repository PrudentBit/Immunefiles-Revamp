import Image from 'next/image'

type Props = {
  group?: UserDashDetails['favourite_group'][0]
}

const UserFavGroupsRow = ({group} : Props) => {
  return (
    <div className='flex gap-4 justify-between items-center p-[0.6rem] px-5 rounded-lg bg-primary_bg'>
      <Image src='/groups-icon.svg' width={20} height={20} alt="group"/>
      <p className='w-full text-[#7A7AFF] text-base font-normal'>{group?.name}</p>
      <button>
        <Image src='/remove-star-icon.svg' width={22} height={22} alt="storage"/>
      </button>
    </div>
  )
}

export default UserFavGroupsRow