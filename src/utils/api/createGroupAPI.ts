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
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
			},
			body: JSON.stringify(data),
		}
  );

  return await res.json();
}
