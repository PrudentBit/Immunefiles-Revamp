export default async function getFiles(hash: string) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/folder_detail/${hash}?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpbGxvd2F0dHMiLCJlbWFpbCI6Imtlc2hhdi5tYWRoYXZAcHJ1ZGVudGJpdC5jb20iLCJleHAiOjE2OTY0OTc1NzZ9.fcRDZv_Jhf_51dY2uMU7XXCbe6divS_R-QHblWRlcxA`,
      },
    }
  );
  return await res.json();
}
