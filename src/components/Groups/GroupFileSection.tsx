import Image from "next/image";
import GroupFile from "@/components/Groups/GroupFile";

type FileSectionProps = {
  subFiles: groupFileandFolderType[];
  type: string;
  group_hash: string;
}

const GroupFileSection = ({ subFiles, type, group_hash}: FileSectionProps) => {
  const sectionType = type === "folder" ? "Folders" : "Files";

  return (
    <div  
      className="flex flex-col" 
    >
      <div className="flex gap-2">
        <Image
          src={`/${type}-icon.svg`}
          width={20}
          height={20}
          alt={`${type} icon`}
          className="ml-[2px]"
        />
        <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">{sectionType}</p>
      </div>
      <div className="container flex gap-3 flex-wrap pb-2 pl-2 pt-5">
        {subFiles.map((file, index) => (
            <GroupFile key={index} file={file} type={type} group_hash={group_hash} className="selectable"/>
        ))}
      </div>  
    </div>
  );
};

export default GroupFileSection;
