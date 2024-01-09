import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function createGroup(name: string, description: string, members: string[]) {
  const data = {
		name: name,
		description: description,
		members: members,
  };

  const res = await fetch(
		`https://api.immunefiles.com/api/api/auth/group/create?tenant=${
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

	const jsonData = await res.json();

  return {data: jsonData, status: res.status};
}
