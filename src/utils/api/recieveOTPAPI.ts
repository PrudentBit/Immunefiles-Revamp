type OTPType = 'email' | 'phone';

export default async function recieveOTPAPI(email: string, type: OTPType) {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/sendOTP/${type}?tenant=${
      window.location.hostname.split(".")[0]
    }&email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
}
