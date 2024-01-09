import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function removeAllTenantLinks() {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/admin/dashboard/analytics?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${makeCookie('token','get')}`,
        "Content-Type": 'application/json',
      },
    }
  );

  const jsonData = await res.json();
  return { status: res.status, data: jsonData };
}
  