export default async function editUser(
  username: string,
  action: string,
  extra_storage?: number
) {
  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  if (token) {
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      const jsonData = await res.json();
      return { success: true, data: jsonData };
    } else {
      throw new Error('Error editing user');
    }
  } else {
    throw new Error('No token found');
  }
}
