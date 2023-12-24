type Permission = {
    two_factor: boolean;
};

type UserDetailsType = {
    domain: string;
    email: string;
    is_admin: boolean;
    name: string;
    permissions: Permission;
    phone_number: string;
    profile_type: string;
    profile_pic: string;
    username: string;
};

type AdminUsersType = {
    username: string;
    email: string;
    name: string;
    profile_pic: string;
    profile_type: string;
    FA: boolean;
    status: boolean;
    storage: number;
    last_active: string;
    is_admin: boolean;
};

type AdminSpecificUserType ={
    FA: boolean;
    email: string;
    last_active: string;
    links: {
        active_links: number;
        expired_link: number;
        total_link: number;
    };
    name: string;
    profile_pic: string;
    profile_type: string;
    status: boolean;
    storage: {
        perecentage: {
            docs: string;
            media: string;
            others: string;
        };
        storage_used: string;
        total_storage: string;
    };
    username: string;
    servers:{
        active_gdrive: number;
        active_onedrive: number;
        total: number;
        total_gdrive: number;
        total_onedrive: number;
    };
    groups:[
        group:{
            is_admin: boolean,
            name: string,
            member_count: number,
        }
    ];
    is_admin: boolean;
};