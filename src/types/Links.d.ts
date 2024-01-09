type sharedLinksType = {
  expired_date: string | null;
  files: linkFilesType[];
  folders: string[];
  generated_on: string;
  is_downloadable: boolean;
  is_favorite: boolean;
  is_proctored: boolean;
  name: string;
  owner: string;
  password: string | null;
  shared_with: string[];
  type: string;
  url: string;
  urlHash: string;
};

type linkFilesType = {
  name: string;
  url: string;
  urlHash: string;
};