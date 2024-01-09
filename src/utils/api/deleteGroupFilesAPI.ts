import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function deleteGroupFiles(file: string | null, folder: string | null, group_hash:string) {
  const data = {
      file_hash: [file],
      folder_hash: [folder],
  };
  const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/group/delete/file/${group_hash}?tenant=${
      window.location.hostname.split(".")[0]
      }`,
      {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${makeCookie('token','get')}`,
          },
          body: JSON.stringify(data),
      }
  );

  const resData = await res.json();

  return {data: resData, status: res.status}
}