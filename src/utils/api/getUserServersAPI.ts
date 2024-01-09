import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function getUserServers(drive:string) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/sync/get_user_servers?tenant=${
    window.location.hostname.split(".")[0]
    }&storage_platform=${
      drive
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
    }
  );
  
  const data = await res.json();
  return {data: data, status: res.status};
}
