import * as querystring from 'querystring';
import * as urlJoin from 'url-join';
import { Result, GenericRequester, Paginated } from '../common';
import { API_PATHS } from '../common/constants/api.constants';
import { App, Apps } from './interface/app.interface';
import {
  ClientOptions,
  IClient,
  ApiResult,
} from './interface/client.interface';
import { Device, Devices } from './interface/device.interface';
import { IncreaseSessionLengthOptions } from './interface/increase-session-length-options.interface';
import { ViewNotificationResult } from './interface/view-notification.interface';
import { CreateNotificationOptions } from './interface/create-notification-options.interface';
import { NotificationCreatedResponse } from './interface/create-notification-response.interface';

export class Client implements IClient {
  private readonly appId: string;
  private readonly restApiKey: string;
  private readonly userAuthKey?: string;

  constructor(options: ClientOptions) {
    this.appId = options.appId;
    this.restApiKey = options.restApiKey;
    this.userAuthKey = options.userAuthKey;

    if (!this.appId || !this.restApiKey) {
      throw new Error('Insufficient parameters to client');
    }
  }

  public buildUriWithApp(path: string, urlParams: string[] = []) {
    const qs = querystring.stringify({ app_id: this.appId });
    return urlJoin(path, ...urlParams, `?${qs}`);
  }

  public async viewApps(): Promise<Result<Paginated<App[], 'apps'>>> {
    if (!this.userAuthKey) {
      throw new Error('Client::viewApps - Missing user auth key');
    }
    const uri = API_PATHS.apps;
    return GenericRequester({
      uri,
      authKey: this.userAuthKey,
      method: 'GET',
    });
  }

  /**
   * Returns the application details of the app
   * Defaults to appId from constructor
   *
   * @param appId Optional ID to view specific app
   */
  public async viewApp(appId?: string): Promise<Result<App>> {
    if (!this.userAuthKey) {
      throw new Error('Client::viewApp - Missing user auth key');
    }
    const _appId = appId || this.appId;
    if (!_appId) {
      throw new Error('No valid app id found');
    }
    const uri = urlJoin(API_PATHS.apps, this.appId);
    return GenericRequester({
      uri,
      authKey: this.userAuthKey,
      method: 'GET',
    });
  }

  public async viewDevices(): Promise<Result<Devices>> {
    const uri = this.buildUriWithApp(API_PATHS.devices);
    return GenericRequester({
      uri,
      authKey: this.restApiKey,
      method: 'GET',
    });
  }

  public async viewDevice(playerId: string): Promise<Result<Device>> {
    const uri = this.buildUriWithApp(API_PATHS.devices, [playerId]);
    return GenericRequester({
      uri,
      authKey: this.restApiKey,
      method: 'GET',
    });
  }

  newSession(playerId: string): Result<ApiResult> {
    throw new Error('Method not implemented.');
  }
  increaseSessionLength(
    options: IncreaseSessionLengthOptions,
  ): Promise<ApiResult> {
    throw new Error('Method not implemented.');
  }
  viewNotification(notificationId: string): Result<ViewNotificationResult> {
    throw new Error('Method not implemented.');
  }
  createNotification(
    options: CreateNotificationOptions,
  ): Result<NotificationCreatedResponse> {
    throw new Error('Method not implemented.');
  }
}
