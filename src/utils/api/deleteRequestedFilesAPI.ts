export default async function deleteRequestedFiles(requestHash?: string) {
  try {
    const res = await fetch(
      `https://api.immunefiles.com/api/api/content/internal/requests?tenant=${
        window.location.hostname.split('.')[0]
      }&hash=${requestHash || "all"}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return {data, status: res.status};
  } catch (error) {
    console.error();
  }
}