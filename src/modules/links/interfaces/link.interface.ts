export interface Link {
  id: string;
  institution: string;
  access_mode: 'single' | 'recurrent' | null;
  last_accessed_at: string | null;
  created_at: string;
  external_id: string | null;
  institution_user_id?: string;
  status: 'valid' | 'invalid' | 'unconfirmed' | 'token_required';
  created_by: string;
  refresh_rate: string | null;
  credentials_storage: string;
  fetch_resources: string[];
  stale_in: string;
}
export interface LinksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Link[];
}
