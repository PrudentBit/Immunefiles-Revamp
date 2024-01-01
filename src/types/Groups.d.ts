type MemberType = {
  can_add_delete_content: boolean;
  can_download_content: boolean;
  can_share_content: boolean;
  email: string;
  has_read: boolean;
  is_admin: boolean;
  is_owner: boolean;
  is_proctored: boolean;
  username: string;
};

type GroupDetailsType = {
  admin: boolean;
  can_add_delete_content: boolean;
  created: string;
  description: string;
  is_favourite: boolean;
  is_owner: boolean;
  is_read: boolean;
  members: MemberType[];
  name: string;
  owner: string;
  urlhash: string;
};
