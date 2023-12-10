export default async function downloadResource(url: string): Promise<Blob> {
  try {
    const res = await fetch(url, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: "cors",
    });

    if (!res.ok) {
      throw new Error('Error downloading resource');
    }

    const blob = await res.blob();
    return blob;
  } catch (error) {
    console.error(error);
    throw new Error('Some error occurred, please try again later');
  }
}