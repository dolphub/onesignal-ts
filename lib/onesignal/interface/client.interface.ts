import { Device, Devices } from './device.interface';
import { ApiResult } from '../../common';

export interface ClientOptions {
  appId: string;
  restApiKey: string;
  userAuthKey?: string;
}

export interface IClient {
  viewApp: () => Promise<any>;
  viewDevices: () => Promise<ApiResult<Devices>>;
  viewDevice: (playerId: string) => Promise<ApiResult<Device>>;
}
