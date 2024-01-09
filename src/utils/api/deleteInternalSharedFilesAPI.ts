import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function deleteSharedFiles(files: string[], folders: string[]) {
  const apiData = {
    files: files,
    folders: folders,
  }
  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/internal/details/root?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
      body: JSON.stringify(apiData),
    }
  );
  const data = await res.json();
  return {data: data, status: res.status};
}