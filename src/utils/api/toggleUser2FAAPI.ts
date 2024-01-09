import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function toggleUser2FA(twoFA: boolean) {
  const data = {
      two_factor: twoFA,
  };
  const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/change_permissions?tenant=${
        window.location.hostname.split(".")[0]
        }`,
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${makeCookie('token','get')}`,
          },
          body: JSON.stringify(data),
      }
  );

  return await res.json();
}
