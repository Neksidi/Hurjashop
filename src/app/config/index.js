import Config from 'react-native-config'

const PORT = Config.PORT;
const BASE_URL = Config.BASE_URL
const WEB_URL   = BASE_URL + ":" + PORT + "/" + Config.WEB_URL;
const PH_URL    = BASE_URL + ":" + PORT + "/" + Config.PH_URL;
const AUTH_URL  = BASE_URL + ":" + PORT + "/" + Config.AUTH_URL;
const DB_URL    = BASE_URL + ":" + PORT + "/" + Config.DB_URL;
const POSTI_URL = BASE_URL + ":" + PORT + "/" + Config.POSTI_URL;
const MAIL_URL  = BASE_URL + ":" + PORT + "/" + Config.MAIL_URL;

export {
    WEB_URL,
    PH_URL,
    AUTH_URL,
    DB_URL,
    POSTI_URL,
    MAIL_URL
}


