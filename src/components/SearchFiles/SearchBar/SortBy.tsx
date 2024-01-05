import { useEffect } from "react";

type Props = {
  allActive: boolean;
  groupsOnly: boolean;
  filesOnly: boolean;
  linksOnly: boolean;
  internalOnly: boolean;
  setAllActive: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupsOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setFilesOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setLinksOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setInternalOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

type sortType = 'files' | 'groups' | 'links' | 'internal' | 'all';

const SortBy = ({ allActive, groupsOnly, filesOnly, linksOnly, internalOnly, setAllActive, setGroupsOnly, setFilesOnly, setLinksOnly, setInternalOnly }: Props) => {
  const handleSort = (type: sortType) => {
    switch(type) {
      case 'files':
        setFilesOnly(prev => !prev);
        break;
      case 'groups':
        setGroupsOnly(prev => !prev);
        break;
      case 'links':
        setLinksOnly(prev => !prev);
        break;
      case 'internal':
        setInternalOnly(prev => !prev);
        break;
      case 'all':
        setAllActive(true);
        setFilesOnly(false);
        setGroupsOnly(false);
        setLinksOnly(false);
        setInternalOnly(false);
        break;
      default:
        break;
    }
  }
  

  useEffect(() => {
    if (!(filesOnly || groupsOnly || linksOnly || internalOnly)) {
      setAllActive(true);
    } else {
      setAllActive(false);
    }
  }, [filesOnly, groupsOnly, linksOnly, internalOnly]);

  return (
    <div className="w-full max-h-[7vh] flex items-center gap-4">
      <button onClick={()=> handleSort('all')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${allActive && "bg-primary_font text-white"}`}>
        <span className="font-medium text-sm">Search all</span>
      </button>

      <button onClick={()=> handleSort('files')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${filesOnly && "bg-primary_font text-white"}`}>
        <span className="font-medium text-sm">File System</span>
      </button>

      <button onClick={()=> handleSort('groups')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${groupsOnly && "bg-primary_font text-white"}`}>
        <span className="font-medium text-sm">Groups</span>
      </button>

      <button onClick={()=> handleSort('links')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${linksOnly && "bg-primary_font text-white"}`}>
        <span className="font-medium text-sm">Links</span>
      </button>

      <button onClick={()=> handleSort('internal')} className={`px-4 h-8 rounded-full whitespace-nowrap border-[1px] border-solid border-primary_font ${internalOnly && "bg-primary_font text-white"}`}>
        <span className="font-medium text-sm">Internal Share</span>
      </button>
    </div>
  )
}

export default SortBy