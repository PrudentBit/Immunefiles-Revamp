type ShareSettings = {
  expiry: boolean;
  password: boolean;
  accesslimit: boolean;
  downloadable: boolean;
  shareable: boolean;
  proctored: boolean;
  expiryDate: string | null;
  expiryTime: string | null;
  passwordValue: string | null;
  accessValue: number;
  watermark: boolean;
};

type InternalShareSettings = {
  shareable: boolean;
  downloadable: boolean;
  modifyable: boolean;
  proctored: boolean;
};
