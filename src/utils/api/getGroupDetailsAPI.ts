export default async function fetchGroupDetails() {
	const res = await fetch(
		`https://api.immunefiles.com/api/api/auth/group_details?tenant=${
			window.location.hostname.split(".")[0]
		}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
			},
		}
	);

	return await res.json();
}