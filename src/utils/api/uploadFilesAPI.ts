import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from 'axios';
import { makeCookie } from '@/utils/helper/makeOrGetCookie'

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
      Authorization: `Bearer ${makeCookie('token','get')}`,
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

    return { data: res.data, status: res.status};
  } catch (error) {
    console.error(error);
  }
}
