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
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
            },
            body: JSON.stringify(data),
        }
    );

    return await res.json();
}
