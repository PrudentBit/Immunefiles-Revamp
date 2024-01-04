export default async function deleteFiles(files: string[], folders: string[]) {
    const data = {
        file_hash: files,
        folder_hash: folders,
    };
    const res = await fetch(
        `https://api.immunefiles.com/api/api/content/check_delete?tenant=${
        window.location.hostname.split(".")[0]
        }`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
            },
            body: JSON.stringify(data),
        }
    );
    
    const jsonData = await res.json();

    return { status: res.status, data: jsonData};
    }