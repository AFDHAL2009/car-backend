const OneSignal = require("@onesignal/node-onesignal");
const API_KEY = "MmUyZjJiNjEtNDZhZC00NDk3LTgzYjEtZWM5OTI5ZDdlNDUx";
const ONESIGNAL_APP_ID = "b1057881-bf6b-4aa1-a669-0f3e585a3555";
const BASE_URL_ONESIGNAL = "https://onesignal.com/api/v1";
const app_key_provider = {
  getToken() {
    return API_KEY;
  },
};
const ONESIGNAL_CONFIG = OneSignal.createConfiguration({
  authMethods: {
    app_key: {
      tokenProvider: app_key_provider,
    },
  },
});
module.exports = {
  ONESIGNAL_CONFIG,
  ONESIGNAL_APP_ID,
  BASE_URL_ONESIGNAL,
};
