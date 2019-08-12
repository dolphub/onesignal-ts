import * as querystring from 'querystring';
import { GenericRequester, Paginated, Result } from '../common';
import { API_PATHS } from '../common/constants/api.constants';
import { App } from './interface/app.interface';
import {
  ApiResult,
  ClientOptions,
  IClient,
} from './interface/client.interface';
import { CreateNotificationOptions } from './interface/create-notification-options.interface';
import { NotificationCreatedResponse } from './interface/create-notification-response.interface';
import { Device } from './interface/device.interface';
import { IncreaseSessionLengthOptions } from './interface/increase-session-length-options.interface';
import { ViewNotificationResult } from './interface/view-notification.interface';

// TODO: Use a different lib
// tslint:disable-next-line:no-var-requires
const urlJoin = require('url-join');

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
    const applicationId = appId || this.appId;
    if (!applicationId) {
      throw new Error('No valid app id found');
    }
    const uri = urlJoin(API_PATHS.apps, applicationId);
    return GenericRequester({
      uri,
      authKey: this.userAuthKey,
      method: 'GET',
    });
  }

  public async viewDevices(): Promise<Result<Paginated<Device[], 'devices'>>> {
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

  public async newSession(playerId: string): Promise<Result<ApiResult>> {
    const uri = this.buildUriWithApp(API_PATHS.devices, [
      playerId,
      'on_session',
    ]);
    return uri;
  }

  public async increaseSessionLength(
    options: IncreaseSessionLengthOptions,
  ): Promise<ApiResult> {
    throw new Error('Method not implemented.');
  }

  public async viewNotification(
    notificationId: string,
  ): Promise<Result<ViewNotificationResult>> {
    throw new Error('Method not implemented.');
  }
  public async createNotification(
    options: CreateNotificationOptions,
  ): Promise<Result<NotificationCreatedResponse>> {
    throw new Error('Method not implemented.');
  }
}
