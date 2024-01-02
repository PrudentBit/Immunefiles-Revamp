import TopNav from '@/components/TopNav';
import GroupFileNavigation from '@/components/Groups/GroupFileNavigation';
import GroupFileAndFolder from '@/components/Groups/GroupFileAndFolder';

interface FolderPageProps {
  params: {group_hash: string, folder_hash: string}
}

const FolderPage: React.FC<FolderPageProps> = ({ params: { group_hash, folder_hash } }) => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='groups'/>
      
      <GroupFileNavigation folder_hash={folder_hash} group_hash={group_hash}/>

      <GroupFileAndFolder folder_hash={folder_hash} group_hash={group_hash}/>
    </div>
  );
};

export default FolderPage;
