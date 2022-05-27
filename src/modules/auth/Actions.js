import {createRoutine} from "redux-saga-routines";

const SIGN_IN = createRoutine("SIGN_IN");
const FORGOT_PASSWORD = createRoutine("FORGOT_PASSWORD");
const REFRESH_TOKEN = createRoutine("REFRESH_TOKEN");
const SET_PASSWORD = createRoutine("SET_PASSWORD");
const CHECK_AUTH = createRoutine("CHECK_AUTH");
const LOGOUT = createRoutine("LOGOUT");
const SET_ENV = createRoutine("SET_ENV");

export default {
    SIGN_IN,
    FORGOT_PASSWORD,
    REFRESH_TOKEN,
    SET_PASSWORD,
    CHECK_AUTH,
    LOGOUT,
    SET_ENV
}
