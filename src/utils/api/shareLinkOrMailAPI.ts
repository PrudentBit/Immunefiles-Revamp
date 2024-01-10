import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function shareLinkOrMail(
  accessType: string,
  linkTitle: string,
  values: ShareSettings,
  sentFileArray: string[],
  sentFolder: string[],
  inputFields: string[]
) {
  const data = {
    owner: '',
    name: linkTitle,
    file_hash: sentFileArray,
    folder_hash: sentFolder,
    shared_with: inputFields,
    prevent_forwarding: false,
    is_downloadable: values.downloadable,
    is_proctored: values.proctored,
    expiry_date:
      values.expiryDate && values.expiryDate.length > 0
        ? `${values.expiryDate} ${
            values.expiryTime && values.expiryTime.length > 0
              ? values.expiryTime
              : '00:00'
          }:00`
        : '',
    access_type: accessType,
    is_password: values.password,
    access_limit: values.accessValue > 0 ? values.accessValue : -1,
    custom_password: values.password ? values.passwordValue : '',
    is_random_password: false,
    clients_shared_with: inputFields,
    watermark: values.watermark,
  };

  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/share_file_link?tenant=${
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
