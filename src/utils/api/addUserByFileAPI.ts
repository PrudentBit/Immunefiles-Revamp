export default async function csvUser(file: File) {
  const formData = new FormData();
  formData.append("csv_file", file, file.name);

  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/admin/create/bulk/users?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: formData,
    }
  );

  const jsonData = await res.json();
  return { status: res.status, data: jsonData };
}