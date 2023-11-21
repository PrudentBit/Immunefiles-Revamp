export default async function groupShare(
  settings: InternalShareSettings,
  groupUrlHashes: string[],
  groupSelectedFile: string[],
  groupSelectedFolder: string[]
) {
  const groupData = {
    group_hash: groupUrlHashes,
    file_hash: groupSelectedFile?.map((content) => content),
    folder_hash: groupSelectedFolder?.map((content) => content),
    can_share_content: settings.shareable,
    can_download_content: settings.downloadable,
    can_delete_content: settings.modifyable,
  };

  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/group/add/file_folder?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: JSON.stringify(groupData),
    }
  );

  if (res.ok) {
    const jsonData = await res.json();
    return { success: true, message: 'Successfully Shared', data: jsonData };
  } else {
    throw new Error('Error sharing with group');
  }
}
