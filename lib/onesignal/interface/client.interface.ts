import { ApiResult } from '../../common';
import { IDevice, IDevices } from './device.interface';

export interface ClientOptions {
  appId: string;
  restApiKey: string;
  userAuthKey?: string;
}

export interface IClient {
  viewApp: () => Promise<any>;
  viewDevices: () => Promise<ApiResult<IDevices>>;
  viewDevice: (playerId: string) => Promise<ApiResult<IDevice>>;
}
