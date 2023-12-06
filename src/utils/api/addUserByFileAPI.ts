export default async function csvUser(file: File) {
  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  if (token) {
    const formData = new FormData();
    formData.append("csv_file", file, file.name);

    const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/admin/create/bulk/users?tenant=${
        window.location.hostname.split(".")[0]
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      const jsonData = await res.json();
      return { success: true, message: 'Users were added successfully!', data: jsonData };
    } else {
      throw new Error('Some error occurred');
    }
  } else {
    throw new Error("No token found");
  }
}