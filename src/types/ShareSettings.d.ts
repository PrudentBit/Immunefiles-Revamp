type ShareSettings = {
    expiry: boolean;
    password: boolean;
    accesslimit: boolean;
    downloadable: boolean;
    shareable: boolean;
    proctored: boolean;
    expiryDate: String | null;
    expiryTime: String | null;
    passwordValue: string | null;
    accessValue: number;
};

type InternalShareSettings = {
    shareable: boolean;
    downloadable: boolean;
    modifyable: boolean;
    proctored: boolean;
};