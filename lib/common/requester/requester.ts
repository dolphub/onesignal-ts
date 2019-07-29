import * as request from 'request';
import { API_ROOT } from '../constants/api.constants';
// tslint:disable-next-line:no-var-requires
const urlJoin = require('url-join');

interface BodyOptions {
  [key: string]: any;
}

export interface RequesterResult {
  data: string | any;
  request: BodyOptions;
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const getHeaders = authKey => ({
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: `Basic ${authKey}`,
});

export interface KVStore {
  [key: string]: string | number | KVStore;
}

export interface GenericRequesterOptions {
  method: HttpMethods;
  uri: string;
  authKey: string;
  body?: KVStore | string;
}

export interface Result<T> {
  data: T;
  request: Request;
}

const resolveUri = uri => urlJoin(API_ROOT, uri);

export const GenericRequester = (
  options: GenericRequesterOptions,
): Promise<{ data: any; request: any }> => {
  return new Promise((resolve, reject) => {
    const headers = getHeaders(options.authKey);
    const uri = resolveUri(options.uri);
    request(uri, { headers }, (error, req, body) => {
      if (error) {
        return reject(error);
      }
      let parsed;
      try {
        if (body) {
          parsed = JSON.parse(body);
        }
      } catch (e) {
        //
      }
      resolve({
        data: parsed || body,
        request: req,
      });
    });
  });
};
