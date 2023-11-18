import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from 'axios';

export default async function uploadFolders(
  folderInput: File[],
  onUploadProgress: (_progress: number) => void
) {
  const formData = new FormData();

  formData.append('folder_name', folderInput[0].path.split('/')[1]);
  formData.append('parent_hash', 'none');

  folderInput.forEach((fileObj) => {
    let filePath = fileObj.path.split('/');
    if (filePath[0] === '') {
      filePath = filePath.join('/').substring(1);
    }
    formData.append(filePath, fileObj);
    formData.append('shared_with', []);
  });

  const config: AxiosRequestConfig = {
    onUploadProgress: function (progressEvent: AxiosProgressEvent) {
      if (progressEvent.progress) {
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
      `https://api.immunefiles.com/api/api/content/upload_folder?tenant=${
        window.location.hostname.split('.')[0]
      }`,
      formData,
      config
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
