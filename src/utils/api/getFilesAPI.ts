export default async function getFiles(hash: string) {
  if(hash){
    const res = await fetch(
      `https://api.immunefiles.com/api/api/content/folder_detail/${hash}?tenant=${
        window.location.hostname.split(".")[0]
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    return await res.json();
  }
}
