import { Client } from '../../lib';

(async () => {
  try {
    const client = new Client({
      appId: process.env.APP_ID,
      restApiKey: process.env.REST_API_KEY,
      userAuthKey: process.env.USER_AUTH_KEY,
    });

    const { data, request } = await client.viewApps();
    // data.apps[0].apns_certificates;
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
})();
