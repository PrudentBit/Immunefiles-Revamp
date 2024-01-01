type MemberType = {
  is_admin: boolean;
  name: string;
};

type GroupDetailsType = {
  created: string;
  description: string;
  files_shared: number;
  folders_shared: number;
  group_hash: string;
  is_admin: boolean;
  is_favorite: boolean;
  members: MemberType[];
  name: string;
  owner: string;
};