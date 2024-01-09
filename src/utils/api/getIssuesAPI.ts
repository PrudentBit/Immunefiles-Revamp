import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function getIssues() {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/user/feedback?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
    }
  );

  const data = await res.json();
  return { data: data, status: res.status };
}
