type EditGroupParams =
  | {
      action: "rename";
      group_hash: string;
      name?: string;
      description?: string;
    }
  | {
      action: "delete";
      group_hash: string;
    }
  | {
      action: "add";
      group_hash: string;
      email: string[];
    }
  | {
      action: "remove" | "toggle_admin";
      group_hash: string;
      email: string;
    };

type EditGroupResponse = {
  data: any;
  status: number;
};

export default async function editGroup(params: EditGroupParams): Promise<EditGroupResponse> {
  const res = await fetch(
    `https://api.immunefiles.com/api/api/auth/group/group_details?tenant=${
      window.location.hostname.split(".")[0]
    }`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );

  const jsonResponse = await res.json();

  return { data: jsonResponse, status: res.status };
}
