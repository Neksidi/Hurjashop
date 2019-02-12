import Config from 'react-native-config'

const PORT = Config.PORT;
const BASE_URL = Config.BASE_URL
export const WEB_URL   = BASE_URL + ":" + PORT + "/" + Config.WEB_URL;
export const PH_URL    = BASE_URL + ":" + PORT + "/" + Config.PH_URL;
export const AUTH_URL  = BASE_URL + ":" + PORT + "/" + Config.AUTH_URL;
export const DB_URL    = BASE_URL + ":" + PORT + "/" + Config.DB_URL;
export const POSTI_URL = BASE_URL + ":" + PORT + "/" + Config.POSTI_URL;
export const MAIL_URL  = BASE_URL + ":" + PORT + "/" + Config.MAIL_URL;


