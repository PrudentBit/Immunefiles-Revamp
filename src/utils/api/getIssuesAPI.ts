export default async function getIssues() {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/user/feedback?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  return { data: data, status: res.status };
}
