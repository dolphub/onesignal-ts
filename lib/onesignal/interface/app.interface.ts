import { Paginated } from '../../common';

/**
 * OneSignal App
 */
export interface App {
  id: string;
  name: string;
  gcm_key: string | null;
  chrome_key: string | null;
  chrome_web_key: string;
  chrome_web_origin: string;
  chrome_web_gcm_sender_id: string;
  chrome_web_default_notification_icon: string;
  chrome_web_sub_domain: string | null;
  apns_env: string | null;
  apns_certificates: string | null;
  safari_apns_certificate: string | null;
  safari_site_origin: string | null;
  safari_push_id: string | null;
  safari_icon_16_16: string;
  safari_icon_32_32: string;
  safari_icon_64_64: string;
  safari_icon_128_128: string;
  safari_icon_256_256: string;
  site_name: string;
  created_at: string;
  updated_at: string;
  players: number;
  messageable_players: number;
  basic_auth_key: string;
  additional_data_is_root_payload: false;
}

export interface Devices extends Paginated {
  apps: App[];
}
