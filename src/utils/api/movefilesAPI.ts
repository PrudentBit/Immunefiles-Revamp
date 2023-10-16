export default async function moveFiles(files: string[], currentFolder: string, toFolder: string) {
    const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
    if (token) {
      const data = {
        file_hash: files,
        folder_hash: currentFolder,
        move_folder: toFolder,
      };
  
      const res = await fetch(
        `https://api.immunefiles.com/api/api/content/move_folder?tenant=${window.location.hostname.split('.')[0]}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
  
      if (res.ok) {
        const jsonData = await res.json();
        return { success: true, data: jsonData };
      } else {
        throw new Error('Error moving files');
      }
    } else {
      throw new Error('No token found');
    }
  }
  