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