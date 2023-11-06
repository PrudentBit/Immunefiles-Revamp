export async function unzippingFiles(fileUrls: string[], destinationUrl?: string) {
  const data = {
    files: fileUrls,
    destination: destinationUrl || null,
  };

  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/unzip-content?tenant=${
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

  return await res.json();
}
