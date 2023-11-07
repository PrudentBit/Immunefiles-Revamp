export default async function getUsers() {
  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  if (token) {
    const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/admin/dashboard/users?tenant=${
        window.location.hostname.split(".")[0]
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  } else {
    throw new Error("No token found");
  }
}