import { Client } from '../../lib';

(async () => {
  try {
    const client = new Client({
      appId: process.env.APP_ID,
      restApiKey: process.env.REST_API_KEY,
      userAuthKey: process.env.USER_AUTH_KEY,
    });

    // const apps = await client.viewApps();
    // const app = await client.viewApp();

    const devicesResult = await client.viewDevices();
    if (devicesResult.data.players.length > 0) {
      const deviceResult = await client.viewDevice(
        devicesResult.data.players[0].id,
      );
      const { device_os, session_count } = deviceResult.data;
      // tslint:disable-next-line:no-console
      console.log(device_os, session_count);
    }
  } catch (e) {
    //
  }
})();
