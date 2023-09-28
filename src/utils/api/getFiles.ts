export default async function getFiles() {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/folder_detail/root?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpbGxvd2F0dHMiLCJlbWFpbCI6Imtlc2hhdi5tYWRoYXZAcHJ1ZGVudGJpdC5jb20iLCJleHAiOjE2OTU4OTI5NDB9.vLkDP5rXs73-oey7qAhTMSuLlcnHnfC6uZNsB7JTMPM`,
      },
    }
  );
  return await res.json();
}
