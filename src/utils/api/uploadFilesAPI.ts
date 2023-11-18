import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from 'axios';

export default async function uploadFiles(
  fileInput: File[],
  currentFolder: string,
  onUploadProgress: (_progress: number) => void
) {
  const fileArr = [...fileInput];
  const formData = new FormData();

  fileArr.forEach((file, index) => {
    formData.append(`contents${index}`, file);
  });

  const config: AxiosRequestConfig = {
    onUploadProgress: function (progressEvent: AxiosProgressEvent) {
      if (progressEvent.progress) {
        const percentCompleted = Math.round(progressEvent.progress * 100);
        onUploadProgress(percentCompleted);
      }
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  };

  try {
    const res: AxiosResponse = await axios.post(
      `https://api.immunefiles.com/api/api/content/file_create/${currentFolder}?tenant=${
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
