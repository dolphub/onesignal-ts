import { ClientOptions, IClient } from './interface/client.interface';
import { GenericRequester, ApiResult } from '../common';
import { API_PATHS } from '../common/constants/api.constants';
import * as querystring from 'querystring';
import * as urlJoin from 'url-join';
import { Device, Devices } from './interface/device.interface';
import { App } from './interface/app.interface';

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

  buildUriWithApp(path: string, urlParams: string[] = []) {
    const qs = querystring.stringify({ app_id: this.appId });
    return urlJoin(path, ...urlParams, `?${qs}`);
  }

  public async viewApps(): Promise<ApiResult<App[]>> {
    if (!this.userAuthKey) {
      throw new Error('Client::viewApps - Missing user auth key');
    }
    const uri = API_PATHS.apps;
    console.log(uri);
    return GenericRequester({
      uri,
      apiKey: this.userAuthKey,
      method: 'GET',
    });
  }

  public async viewApp(): Promise<ApiResult<App>> {
    if (!this.userAuthKey) {
      throw new Error('Client::viewApp - Missing user auth key');
    }
    const uri = urlJoin(API_PATHS.apps, this.appId);
    return GenericRequester({
      uri,
      apiKey: this.userAuthKey,
      method: 'GET',
    });
  }

  public async viewDevices(): Promise<ApiResult<Devices>> {
    const uri = this.buildUriWithApp(API_PATHS.devices);
    return GenericRequester({
      uri,
      apiKey: this.restApiKey,
      method: 'GET',
    });
  }

  public async viewDevice(playerId: string): Promise<ApiResult<Device>> {
    const uri = this.buildUriWithApp(API_PATHS.devices, [playerId]);
    return GenericRequester({
      uri,
      apiKey: this.restApiKey,
      method: 'GET',
    });
  }
}
