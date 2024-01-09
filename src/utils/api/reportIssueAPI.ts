import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function reportIssue(heading: string, explanation: string, issueType: string, images: File[]) {
  const formData = new FormData();

  formData.append('issue_brief', heading);
  formData.append('issue_description', explanation);
  formData.append('issue_type', issueType);

  images.forEach((image) => {
    formData.append("image", image);
  });

  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/user/feedback?tenant=${window.location.hostname.split(".")[0]}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${makeCookie('token','get')}`,
      },
      body: formData,
    }
  );

  const data = await res.json();
  return { data: data, status: res.status}
}
