export default async function createServer(server_name: string, platform: string, user: string) {
  const data = {
		server_name: server_name,
    storage_platform: platform,
    user: user
  };

  const res = await fetch(
		`https://api.immunefiles.com/api/api/sync/create_server_${platform}?tenant=${
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

	const jsonData = await res.json();

  return {data: jsonData, status: res.status};
}
