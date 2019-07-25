import { kvstore } from '../../common';
import { Paginated } from '../../common/requester/interfaces/pagination.interface';

/**
 * OneSignal Device
 */
export interface Device {
  id: string;
  identifier: string;
  session_count: number;
  language: string;
  timezone: number;
  game_version: string | null;
  device_os: string;
  device_type: number;
  device_model: string;
  ad_id: string | null;
  tags: kvstore;
  last_active: number;
  playtime: number;
  amount_spent: number;
  created_at: number;
  invalid_identifier: boolean;
  badge_count: number;
  sdk: string;
  test_type: string | null;
  ip: string;
  external_user_id: string | null;
}

export interface Devices extends Paginated {
  players: Device[];
}
