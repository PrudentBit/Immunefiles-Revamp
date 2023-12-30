export default async function applyUserSOS() {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/user/dashboard/details?tenant=${
    window.location.hostname.split(".")[0]
    }`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    }
  );

  return await res.json();
}
