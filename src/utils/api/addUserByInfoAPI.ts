import { makeCookie } from '@/utils/helper/makeOrGetCookie'

type UserInfo = {
  name: string;
  email: string;
  number: string;
  username: string;
};

export default async function addUser(info: UserInfo) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/admin/create/user?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
      body: JSON.stringify(info),
    }
  );

  const jsonData = await res.json();
  return { status: res.status, data: jsonData };
}