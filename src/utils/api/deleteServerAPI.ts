import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function deleteServer(server_hash: string) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/sync/delete/${server_hash}?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
    }
  );
  const data = await res.json();
  return {data, status: res.status};
}