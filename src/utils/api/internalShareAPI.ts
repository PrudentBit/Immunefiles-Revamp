import { makeCookie } from '@/utils/helper/makeOrGetCookie'

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
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
      body: JSON.stringify(data),
    }
  );

  const jsonData = await res.json();
  return { status: res.status, data: jsonData };
}
