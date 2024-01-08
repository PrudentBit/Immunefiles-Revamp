export default async function favouriteGroup(groupHash: string) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/group/favorite/${groupHash}?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return {data, status: res.status};
}