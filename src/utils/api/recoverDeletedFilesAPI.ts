import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function recoverDeletedFiles(files: string[], folders: string[]) {
    const data = {
        file_hash: files,
        folder_hash: folders,
    };
    const res = await fetch(
        `https://api.immunefiles.com/api/api/content/deleted/recover?tenant=${
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
