export default async function getEmailSearchQuery(query: string) {
  const res = await fetch(
      `https://api.immunefiles.com/api/api/auth/user/query_email/${query}?tenant=${
      window.location.hostname.split(".")[0]
      }`,
      {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
          }
      }
  );

  return await res.json();
}
