export default async function changeUserPassword(newPass:string, oldPass:string) {
  const data = {
      old_password: oldPass,
      password: newPass,
  };
  const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/change_password?tenant=${
      window.location.hostname.split(".")[0]
      }`,
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
          },
          body: JSON.stringify(data),
      }
  );

  return await res.json();
}
