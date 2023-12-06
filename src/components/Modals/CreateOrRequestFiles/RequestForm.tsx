import React from 'react';
import Image from 'next/image';

type Request = {
  id: string;
  fileName: string;
  email: string;
  isEmailValid: boolean;
  requestType: string;
};

type Props = {
  request: Request;
  requests: Request[];
  setRequests: (_value: Request[]) => void;
};

const RequestForm = ({ request, requests, setRequests }: Props) => {
  const handleInputChange =
    (id: string, field: keyof Request) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRequests: Request[] = [...requests];
      const index = newRequests.findIndex((req) => req.id === id);
      newRequests[index] = {
        ...newRequests[index],
        [field]: event.target.value,
      };

      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newRequests[index].isEmailValid = emailRegex.test(event.target.value);
      }

      setRequests(newRequests);
    };

  const handleRemoveRequest = (id: string) => {
    const newRequests = [...requests];
    const index = newRequests.findIndex((req) => req.id === id);
    newRequests.splice(index, 1);
    setRequests(newRequests);
  };

  return (
    <div className="flex flex-col bg-bg_hover gap-3 p-2 py-3 rounded-md">
      <div className="flex gap-1 flex-col w-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Image
              src="/file-icon.svg"
              width={18}
              height={18}
              alt="Folder icon"
            />
            <p className="text-primary_font font-normal text-sm">
              Request file name
            </p>
          </div>
          {requests.length > 1 && (
            <button
              className="w-5 h-5 p-[0.3rem] rounded-full bg-[#F0F0F0] mt-0"
              onClick={() => handleRemoveRequest(request.id)}
            >
              <Image
                src="/cross-icon.svg"
                width={20}
                height={20}
                className="rounded-full"
                alt="close icon"
              />
            </button>
          )}
        </div>

        <input
          type="text"
          title="Enter file name"
          value={request.fileName}
          onChange={handleInputChange(request.id, 'fileName')}
          className="p-2 px-4 w-full text-secondary_font text-sm rounded-sm"
          required
        />
      </div>

      <div className="flex gap-1 flex-col w-full">
        <div className="flex gap-2">
          <Image
            src="/user-icon.svg"
            width={18}
            height={18}
            alt="Folder icon"
          />
          <p className="text-primary_font font-normal text-sm">
            Request from user
          </p>
        </div>

        <input
          type="email"
          title="Enter username or email"
          value={request.email}
          onChange={handleInputChange(request.id, 'email')}
          placeholder="username@xyz.com"
          className={`p-2 px-4 w-full text-secondary_font rounded-sm text-sm ${
            !request.isEmailValid &&
            'border-[1px] border-solid border-[#FF0000]'
          }`}
          required
        />
      </div>
    </div>
  );
};

export default RequestForm;
