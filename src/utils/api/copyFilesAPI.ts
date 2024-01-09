import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function copyFiles(files: string[], folders: string[], destination: string) {
    const token = makeCookie('token','get');
    if (token) {
      const data = {
        files: files,
        folders: folders,
        destination: destination,
      };
  
      const res = await fetch(
        `https://api.immunefiles.com/api/api/content/copy?tenant=${window.location.hostname.split('.')[0]}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
  
      if (res.ok) {
        const jsonData = await res.json();
        return { success: true, data: jsonData };
      } else {
        throw new Error('Error copying files');
      }
    } else {
      throw new Error('No token found');
    }
  }
