import { Client } from '../../lib';

(async () => {
  try {
    const client = new Client({
      appId: process.env.APP_ID,
      restApiKey: process.env.REST_API_KEY,
    });

    const data = await client.viewDevices();
    console.log('Data: ', data);
  } catch (e) {
    console.error(e);
  }
})();
