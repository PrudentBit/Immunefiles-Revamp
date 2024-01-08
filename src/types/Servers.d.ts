type sync = {
  folder_from_id: string;
  folder_to_id: string;
  folder_from_name: string;
}

type serverType = {
  id: string;
  server_name: string;
  storage_platform: string;
  syncs: sync[]
}