import { UserDetailsStore } from "@/utils/store/userDetailsStore";

type Request = {
  fileName: string;
  email: string;
  isEmailValid: boolean;
};

export default async function requestFiles(requests: Request[], currentFolder: string) {
  const requestData = requests.map(request => ({
    file_name: request.fileName,
    user_from: "",
    user_to: request.email,
  }));

  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/request/create_request/${currentFolder}?tenant=${window.location.hostname.split(".")[0]}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
      body: JSON.stringify(requestData),
    }
  );

  if (res.ok) {
    const jsonData = await res.json();
    return { success: true, message: "Files requested successfully.", data: jsonData };
  } else {
    throw new Error('Error requesting files');
  }
}
