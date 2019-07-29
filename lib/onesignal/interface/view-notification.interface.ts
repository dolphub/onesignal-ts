import { KVStore } from '../../common';

export interface ViewNotificationResult {
  remaining: number;
  successful: number;
  failed: number;
  errored: number;
  converted: number;
  queued_at: number;
  send_after: number;
  completed_at: number;
  platform_delivery_stats: KVStore;
}
