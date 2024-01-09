import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function set2FA(usernames: string[]) {
    const token = makeCookie('token','get');
    if (token) {
      const data = {
        usernames: usernames
      };
  
      const res = await fetch(
        `https://api.immunefiles.com/api/api/auth/set_2FA?tenant==${
          window.location.hostname.split(".")[0]
        }`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
  
      if (res.ok) {
        const jsonData = await res.json();
        return { success: true, data: jsonData };
      } else {
        throw new Error('Error setting 2FA');
      }
    } else {
      throw new Error("No token found");
    }
  }