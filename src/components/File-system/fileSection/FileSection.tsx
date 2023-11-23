import React from "react";
import Image from "next/image";
import File from "@/components/File-system/File";

type FileSectionProps = {
  subFiles: FileOrFolderType[];
  type: string;
}

const FileSection = ({ subFiles, type }: FileSectionProps) => {
  const sectionType = type === "Folders" ? "Folder" : "File";

  return (
    <section className="flex flex-col gap-5">
      <div className="flex gap-2">
        <Image
          src={`/${sectionType}-icon.svg`}
          width={20}
          height={20}
          alt={`${type} icon`}
          className="ml-[2px]"
        />
        <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">{type}</p>
      </div>

      <div className="flex gap-3 flex-wrap pb-2">
        {subFiles.map((folder, index) => (
          <File key={index} file={folder} type={type}/>
        ))}
      </div>
    </section>
  );
};

export default FileSection;
