import { makeCookie } from '@/utils/helper/makeOrGetCookie'

export default async function getUserDetails() {
    const token = makeCookie('token','get');
    if (token) {
        const res = await fetch(
            `https://api.immunefiles.com/api/api/auth/user?tenant=${
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
