type Request = {
  fileName: string[];
  email: string;
};

export default async function requestFiles(
    request: Request,
    request_type: 'internal' | 'external'
  ) {

  let requestData = {};
  if (request_type === 'internal') {
    requestData ={
      file_name: request.fileName[0],
      user_to: request.email,
    };
  }
  else {
    requestData ={
      file_name: request.fileName,
      user_to: request.email,
    };
  }

  const res = await fetch(
    `https://api.immunefiles.com/api/api/content/create/request/${request_type}?tenant=${
      window.location.hostname.split('.')[0]
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
      body: JSON.stringify(requestData),
    }
  );

  if (res.ok) {
    const jsonData = await res.json();
    return {
      success: true,
      message: 'Files requested successfully.',
      data: jsonData,
    };
  } else {
    throw new Error('Error requesting files');
  }
}
