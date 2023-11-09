export default async function createAdmin(username: string) {
    const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
    if (token) {
      const data = {
        username: username
      };
  
      const res = await fetch(
        `https://api.immunefiles.com/api/auth/admin/create_admin?tenant=prudentbit`,
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
        throw new Error('Error creating admin');
      }
    } else {
      throw new Error("No token found");
    }
  } 