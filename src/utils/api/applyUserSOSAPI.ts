import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function applyUserSOS() {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/user/dashboard/details?tenant=${
    window.location.hostname.split(".")[0]
    }`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
    }
  );

  return await res.json();
}
