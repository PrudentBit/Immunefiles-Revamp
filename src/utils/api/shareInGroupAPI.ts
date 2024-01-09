import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function groupShare(
  settings: InternalShareSettings,
  groupUrlHashes: string[],
  groupSelectedFile: string[],
  groupSelectedFolder: string[]
) {
  const groupData = {
    groups: groupUrlHashes,
    files: groupSelectedFile,
    folders: groupSelectedFolder,
    shareable: settings.shareable,
    downloadable: settings.downloadable,
    editable: settings.modifyable,
    proctored: settings.proctored,
  };

  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/share/group?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
      body: JSON.stringify(groupData),
    }
  );

  const jsonData = await res.json();
  return { status: res.status, data: jsonData };
}
