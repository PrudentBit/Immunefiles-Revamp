export default async function fetchGroupDetails(sortBy: string, order: string) {
	const res = await fetch(
		`https://api.immunefiles.com/api/api/auth/group/group_details?tenant=${
			window.location.hostname.split(".")[0]
		}&sort=${
      sortBy
    }&order=${
      order
    }
      `,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
			},
		}
	);

	const data = await res.json();

	return {data: data, status: res.status};
}