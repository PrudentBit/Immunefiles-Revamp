type SharedWith = {
  can_add_delete_content: boolean;
  can_download_content: boolean;
  can_share_content: boolean;
  email: string;
  is_proctored: boolean;
  username: string;
}
type FileOrFolderType = {
  date_created: string;
  date_modified?: string;
  is_file?: boolean;
  is_folder?: boolean;
  hash_path?: string[];
  path?: string[];
  name: string;
  owner: string;
  shared_with: SharedWith[];
  size?: string;
  url?: string;
  urlhash: string;
}

type SharedFilesType = {
  files: {
    urlhash: string;
    name: string;
    url: string;
    owner: string;
    size: string;
    can_download_content: boolean;
    can_share_content: boolean;
    can_add_delete_content: boolean;
    is_downloadable: boolean;
    is_proctored: boolean;
    is_file: boolean;
    date_created: string;
  }[];
  children: {
    urlhash: string;
    name: string;
    owner: string;
    date_created: string;
    date_modified: string;
    can_download_content: boolean;
    can_share_content: boolean;
    can_add_delete_content: boolean;
    is_downloadable: boolean;
    is_proctored: boolean;
    url?: string; 
    size?: string;
  }[];
  hash_path: null | string;
  path: null | string;
};

type groupFileandFolderType = {
  name: string;
  urlhash: string;
  url?: string;
  shared_by: string;
  date_uploaded?: string;
  size?: string;
  permissions: {
    can_share: boolean;
    can_download: boolean;
    can_delete: boolean;
    editable: boolean;
    proctored: boolean;
  };
}