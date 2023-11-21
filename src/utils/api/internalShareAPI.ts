export default async function internalShare(
  settings: InternalShareSettings,
  sentFileArray: string[],
  sentFolder: string[],
  inputFields: string[]
) {
  const data = {
    owner: '',
    file_hash: sentFileArray,
    folder_hash: sentFolder,
    shared_with: inputFields,
    is_downloadable: settings.downloadable,
    can_add_delete_content: settings.modifyable,
    can_share_content: settings.shareable,
    can_download_content: settings.downloadable,
    is_proctored: settings.proctored,
  };

  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/internalshare?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (res.ok) {
    const jsonData = await res.json();
    return { success: true, message: 'Successfully Shared', data: jsonData };
  } else {
    throw new Error('Error sharing internally');
  }
}
