export default async function internalShare(
  settings: InternalShareSettings,
  sentFileArray: string[],
  sentFolder: string[],
  inputFields: string[]
) {
  const data = {
    owner: '',
    files: sentFileArray,
    folders: sentFolder,
    share_with: inputFields,
    downloadable: settings.downloadable,
    editable: settings.modifyable,
    shareable: settings.shareable,
    is_proctored: settings.proctored,
  };

  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/share/internal?tenant=${
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
