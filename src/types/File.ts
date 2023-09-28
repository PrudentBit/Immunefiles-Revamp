export interface SharedWith {
    can_add_delete_content: boolean;
    can_download_content: boolean;
    can_share_content: boolean;
    email: string;
    is_proctored: boolean;
    username: string;
}

export interface ItemProps {
    date_created: string;
    date_modified?: string;
    is_file?: boolean;
    is_folder?: boolean;
    name: string;
    owner: string;
    shared_with: SharedWith[];
    size?: string;
    url?: string;
    urlhash: string;
}