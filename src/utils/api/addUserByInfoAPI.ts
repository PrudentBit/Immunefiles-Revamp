type UserInfo = {
  name: string;
  email: string;
  number: string;
  username: string;
};

export default async function addUser(info: UserInfo) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/admin/create/user?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: JSON.stringify(info),
    }
  );

  const jsonData = await res.json();
  return { status: res.status, data: jsonData };
}