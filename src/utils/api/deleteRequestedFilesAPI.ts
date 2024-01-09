import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function deleteRequestedFiles(requestHash?: string) {
  try {
    const res = await fetch(
      `https://api.immunefiles.com/api/api/content/internal/requests?tenant=${
        window.location.hostname.split('.')[0]
      }&hash=${requestHash || "all"}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${makeCookie('token','get')}`,
        },
      }
    );
    const data = await res.json();
    return {data, status: res.status};
  } catch (error) {
    console.error();
  }
}