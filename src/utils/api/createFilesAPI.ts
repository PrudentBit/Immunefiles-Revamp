export default async function createFile(fileName: string, fileExtension: string, currentFolder: string) {
  const formData = new FormData();

  const response = await fetch(fileExtension);
  const blob = await response.blob();

  const file = new File([blob], `${fileName}.${fileExtension}`, { type: blob.type });

  formData.append("content", file);
  formData.append("file_name", file.name);

  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/custom_file_create/${currentFolder}?tenant=${window.location.hostname.split(".")[0]}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: formData,
    }
  );

  if (res.ok) {
    const jsonData = await res.json();
    return { success: true, message: "File created successfully.", data: jsonData };
  } else {
    throw new Error('Error creating file');
  }
}
