import { Paginated, Result } from '../../common';
import { App } from './app.interface';
import { CreateNotificationOptions } from './create-notification-options.interface';
import { NotificationCreatedResponse } from './create-notification-response.interface';
import { Device, Devices } from './device.interface';
import { IncreaseSessionLengthOptions } from './increase-session-length-options.interface';
import { ViewNotificationResult } from './view-notification.interface';

export interface ClientOptions {
  appId: string;
  restApiKey: string;
  userAuthKey?: string;
}

export interface ApiResult {
  success: boolean;
}

export interface IClient {
  viewApp(): Promise<Result<App>>;
  viewApps(): Promise<Result<Paginated<App[], 'apps'>>>;
  // createApp(): Promise<Result<App>>;
  viewDevice(playerId: string): Promise<Result<Device>>;
  viewDevices(): Promise<Result<Paginated<Device[], 'devices'>>>;
  newSession(playerId: string): Result<ApiResult>;
  increaseSessionLength(
    options: IncreaseSessionLengthOptions,
  ): Promise<ApiResult>;
  viewNotification(notificationId: string): Result<ViewNotificationResult>;
  createNotification(
    options: CreateNotificationOptions,
  ): Result<NotificationCreatedResponse>;
}
