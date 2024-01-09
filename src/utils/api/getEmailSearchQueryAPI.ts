import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function getEmailSearchQuery(query: string) {
  const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/user/query_email/${query}?tenant=${
      window.location.hostname.split(".")[0]
      }`,
      {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${makeCookie('token','get')}`,
          }
      }
  );

  return await res.json();
}
