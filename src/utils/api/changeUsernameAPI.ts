import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function changeUsername(username:string) {
  const data = {
		username: username
  };
  const res = await fetch(
		`https://api.immunefiles.com/api/api/auth/edit/username?tenant=${
		window.location.hostname.split(".")[0]
		}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${makeCookie('token','get')}`,
			},
			body: JSON.stringify(data),
		}
  );

  return await res.json();
}
