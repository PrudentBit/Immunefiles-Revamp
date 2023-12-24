export default async function confirmEmailOTP(email: string, otp: string) {
  const data = {
      email: email,
      otp: otp,
  };
  const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/verify/otp/login?tenant=${
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
