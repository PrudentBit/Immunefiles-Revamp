import { makeCookie } from '@/utils/helper/makeOrGetCookie'

type sortBy = "name" | "size" | "created" | "modified";
type order = "asc" | "dsc";

export default async function getFiles(hash: string, sortBy: sortBy, order: order) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/folder_detail/${hash}?tenant=${
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
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
    }
  );
  return await res.json();
}
