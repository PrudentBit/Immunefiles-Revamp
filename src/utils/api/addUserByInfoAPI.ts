type UserInfo = {
  name: string;
  email: string;
  number: string;
  username: string;
};

export default async function addUser(info: UserInfo) {
  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  if (token) {
    const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/admin/create/user?tenant=${
        window.location.hostname.split(".")[0]
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(info),
      }
    );

    if (res.ok) {
      const jsonData = await res.json();
      return { success: true, message: jsonData.message, data: jsonData };
    } else {
      throw new Error('Error adding user');
    }
  } else {
    throw new Error("No token found");
  }
}