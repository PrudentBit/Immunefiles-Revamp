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
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
			},
			body: JSON.stringify(data),
		}
  );

  return await res.json();
}
