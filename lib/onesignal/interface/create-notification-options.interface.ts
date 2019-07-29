import { Languages } from '../types/langauges.type';

export type NotificationContent = { [key in Languages]: string };

/**
 * TODO: Populate
 */
export interface CreateNotificationOptions {
  app_id: string;
  include_player_ids?: string[];
  external_id: string; // Idempotent notification reference
  contents: NotificationContent;
}
