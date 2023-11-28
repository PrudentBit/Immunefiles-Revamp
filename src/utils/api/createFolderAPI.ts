export default async function createFolder(
  name: string,
  currentFolder: string
) {
  function parentID() {
    if (currentFolder === 'root') {
      return '';
    } else {
      return `${currentFolder}`;
    }
  }

  const createFolderData = {
    name: name,
    parent: parentID(),
    shared_with: [],
  };

  const upload = await fetch(
    `https://api.immunefiles.com/api/api/content/folder_create?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: JSON.stringify(createFolderData),
    }
  );

  const response = await upload.json();
  if (upload.status === 200) {
    return { success: true, response: response };
  } else {
    throw new Error('Some error occurred, try again later!');
  }
}
