import { Client } from '../../lib';
(async () => {
  try {
    const client = new Client({
      appId: process.env.APP_ID,
      restApiKey: process.env.REST_API_KEY,
      userAuthKey: process.env.USER_AUTH_KEY,
    });

    const result = await client.newSession('123');

    result;
    // console.log(result);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
})();
