export default async function removeAllTenantLinks() {
    const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
    if (token) {
      const res = await fetch(
        `https://api.immunefiles.com/api/api/admin/dashboard/analytics?tenant=${
          window.location.hostname.split(".")[0]
        }`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
          },
        }
      );
  
      if (res.ok) {
        return { success: true };
      } else {
        throw new Error('Error removing all tenant links');
      }
    } else {
      throw new Error("No token found");
    }
  }
  