export default async function changeAvatar(profile_type:string, profile_image?:string, uploaded_image?:File) {
  const data = {
		profile_type: profile_type,
    profile_image: profile_image || uploaded_image,
  };
  const res = await fetch(
		`https://api.immunefiles.com/api/api/auth/upload_profile_pic?tenant=${
		window.location.hostname.split(".")[0]
		}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
			},
			body: JSON.stringify(data),
		}
  );

	const json = await res.json();
	return { data: json, status: res.status}
}
