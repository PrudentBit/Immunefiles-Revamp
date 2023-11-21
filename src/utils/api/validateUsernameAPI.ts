export default async function validateUsername(usernametry: string): Promise<boolean> {
  const regexName = /^[a-zA-Z0-9_]+$/;
  if (!regexName.test(usernametry)) {
    return false;
  }

  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  if (token) {
    const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/check/username/${usernametry}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      return true;
    } else if (res.status === 400) {
      return false;
    } else {
      throw new Error('Error validating username');
    }
  } else {
    throw new Error("No token found");
  }
}
