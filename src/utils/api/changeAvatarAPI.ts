export default async function changeAvatar(profile_type: string, username: string, profile_image?: string, uploaded_image?: File) {
  console.log(profile_type, username, profile_image, uploaded_image);

  const formData = new FormData();

  formData.append("profile_type", profile_type);
  formData.append("username", username);

  if (profile_image) {
    formData.append("profile_pic", profile_image);
  } else if (uploaded_image) {
    formData.append("profile_pic", uploaded_image);
  }

  console.log(formData);

  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/upload_profile_pic?tenant=${window.location.hostname.split(".")[0]}`,
    {
      method: "PUT",
      body: formData,
    }
  );

  const json = await res.json();
  return { data: json, status: res.status };
}
