import axios, { AxiosRequestConfig, AxiosResponse, AxiosProgressEvent } from 'axios';

export default async function uploadFolders(folderInput: {file: File, filePath: string}[], folderName: string, parentID: string, onUploadProgress: (progress: number) => void) {
  const formData = new FormData();

  formData.append("folder_name", folderName);
  formData.append("parent_hash", 'none');

  folderInput.forEach((fileObj) => {
    const filePath = fileObj.filePath.replace(/ /g, "_");
    formData.append(filePath, fileObj.file);
    formData.append("shared_with", []);
  });

  const config: AxiosRequestConfig = {
    onUploadProgress: function(progressEvent: AxiosProgressEvent) {
      if(progressEvent.progress){
        const percentCompleted = Math.round(progressEvent.progress * 100);
        onUploadProgress(percentCompleted);
      }
    },
    headers: {
      'Content-Type': 'json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  };

  try {
    const res: AxiosResponse = await axios.post(
      `https://api.immunefiles.com/api/api/content/upload_folder?tenant=${window.location.hostname.split('.')[0]}`,
      formData,
      config
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
