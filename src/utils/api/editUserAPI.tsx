import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function editUser(
  username: string,
  action: string,
  extra_storage?: number
) {
  const data: { username: string; action: string; extra_storage?: number } = {
    username: username,
    action: action,
  };

  if (action === 'add_extra') {
    data['extra_storage'] = extra_storage;
  }

  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/admin/user/edit?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
      body: JSON.stringify(data),
    }
  );

  const jsonData = await res.json();
  return { status: res.status, data: jsonData}
}
