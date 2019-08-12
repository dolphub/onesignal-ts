import { KeyValStore } from './keyval.interface';

export interface NewSessoionOptions {
  identifier?: string;
  language?: string;
  timezone: number;
  game_version?: string;
  device_os?: string;
  ad_id?: string;
  sdk: string;
  tags: KeyValStore;
}
