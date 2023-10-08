type Permissions = {
    two_factor: boolean;
};

type UserDetailsType = {
    domain: string;
    email: string;
    is_admin: boolean;
    name: string;
    permissions: Permissions;
    phone_number: string;
    profile_type: string;
    profile_pic: string;
    username: string;
};
