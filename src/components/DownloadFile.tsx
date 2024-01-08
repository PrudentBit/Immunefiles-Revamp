import downloadResource from '@/utils/api/getDowloadBlob';
import React from 'react'

type Props = {
  file: FileOrFolderType | groupFileandFolderType | SharedFilesType["files"][0] | SharedFilesType["children"][0];
}

const DownloadFile = ({file}: Props) => {

  const handleDownload = async () => {
    if (file.url) {
      try {
        const blob = await downloadResource(file.url);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file');
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  

  return (
    <div>
      <button onClick={handleDownload}>
        Download
      </button>
    </div>
  )
}

export default DownloadFile