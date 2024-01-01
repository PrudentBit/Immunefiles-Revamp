export default async function uploadRequestedFile(file: File, requestHash: string){
  const formData = new FormData();
  formData.append('content', file);
  formData.append('name', file.name);
  formData.append('request_hash', requestHash); 
  
  try {
    const res = await fetch(
      `https://api.immunefiles.com/api/api/content/internal/requests?tenant=${
        window.location.hostname.split('.')[0]
      }`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error();
  }
}