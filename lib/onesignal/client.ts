import { ClientOptions, IClient } from './interface/client.interface';
import { GenericRequester } from '../common';
import { API_PATHS } from '../common/constants/api.constants';
import * as querystring from 'querystring';
import * as urlJoin from 'url-join';

export class Client implements IClient {
  private readonly appId: string;
  private readonly restApiKey: string;

  constructor(options: ClientOptions) {
    this.appId = options.appId;
    this.restApiKey = options.restApiKey;

    if (!this.appId || !this.restApiKey) {
      throw new Error('Insufficient parameters to client');
    }
  }

  buildUriWithApp(path: string) {
    const qs = querystring.stringify({ app_id: this.appId });
    return urlJoin(path, `?${qs}`);
  }

  public async viewDevices() {
    const uri = this.buildUriWithApp(API_PATHS.devices);
    const { data, request } = await GenericRequester({
      uri,
      apiKey: this.restApiKey,
      method: 'GET',
    });
  }
}
