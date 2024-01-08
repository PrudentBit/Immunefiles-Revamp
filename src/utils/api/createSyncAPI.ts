export default async function createServer(connection: string, folder_from_id: string, folder_to_id: string, folder_from_name: string, mimeType: string) {
  const data = {
		connection: connection,
    folder_from_id: folder_from_id,
    folder_to_id: folder_to_id,
    folder_from_name: folder_from_name,
    mimeType: mimeType
  };

  const res = await fetch(
		`https://api.immunefiles.com/api/api/sync/create_sync?tenant=${
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
