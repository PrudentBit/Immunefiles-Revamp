import { makeCookie } from '@/utils/helper/makeOrGetCookie'

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
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
      body: JSON.stringify(data),
    }
  );

  return await res.json();
}
