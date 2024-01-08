type sortBy = "name" | "size" | "shared";
type order = "asc" | "dsc";

export default async function getSharedFiles(hash: string, sortBy: string, order: string) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/internal/folder_detail/${hash}?tenant=${
      window.location.hostname.split(".")[0]
    }&sort=${
      sortBy
    }&order=${
      order
    }
      `,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    }
  );
  return await res.json();
}
