import * as request from 'request';
import * as url from 'url';
import { API_ROOT } from '../constants/api.constants';
import * as querystring from 'querystring';
import * as urlJoin from 'url-join';

interface BodyOptions {
  [key: string]: any;
}

export interface RequesterResult {
  data: string | any;
  request: BodyOptions;
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const getHeaders = apiKey => ({
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: `Basic ${apiKey}`,
});

export interface kvstore {
  [key: string]: string | number | kvstore;
}

export interface GenericRequesterOptions {
  method: HttpMethods;
  uri: string;
  apiKey: string;
  body?: kvstore | string;
}

export interface ApiResult<T> {
  data: T;
  request: Request;
}

const resolveUri = uri => urlJoin(API_ROOT, uri);

export const GenericRequester = (
  options: GenericRequesterOptions,
): Promise<{ data: any; request: any }> => {
  return new Promise((resolve, reject) => {
    const headers = getHeaders(options.apiKey);
    const uri = resolveUri(options.uri);
    console.log(uri);
    request(uri, { headers }, (error, req, body) => {
      if (error) {
        return reject(error);
      }
      let parsed;
      try {
        if (body) {
          parsed = JSON.parse(body);
        }
      } catch (e) {}

      resolve({
        data: parsed || body,
        request: req,
      });
    });
  });
};
