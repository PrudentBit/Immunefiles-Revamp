type OTPType = 'email' | 'phone';
type boolOrNull = boolean | null;

export default async function confirmOTPAPI(email: string, otp: string , type: OTPType, login?: boolOrNull, FA?: boolOrNull) {
  const data = {
    email: email,
    otp: otp,
    type: type,
    login: login || null,
    FA: FA || null,
  };
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/checkOTP?tenant=${
      window.location.hostname.split(".")[0]
      }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await res.json();
}
