import React from "react";
import Image from "next/image";
import File from "@/components/File-system/File";

type FileSectionProps = {
  subFiles: any[];
  type: string;
}

const FileSection = (props: FileSectionProps) => {
  const { subFiles } = props;
  const type = props.type === "folder" ? "Folders" : "Files";

  return (
    <section className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Image
          src={`/${props.type}-icon.svg`}
          width={20}
          height={20}
          alt={`${props.type} icon`}
          className="ml-[-2px]"
        />
        <p className="text-primary_font font-medium text-lg">{type}</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        {subFiles.map((folder, index) => (
          <File key={index} file={folder} type={props.type}/>
        ))}
      </div>
    </section>
  );
};

export default FileSection;
