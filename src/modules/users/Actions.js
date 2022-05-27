import {createRoutine} from "redux-saga-routines";

const GET_USERS_LIST = createRoutine("GET_USERS_LIST");
const GET_USER = createRoutine("GET_USER");
const CHANGE_USER_STATUS = createRoutine("CHANGE_USER_STATUS");
const GET_USER_REPORT = createRoutine("GET_USER_REPORT");
const GET_CARDS_LIST = createRoutine("GET_CARDS_LIST");
const GET_EVENTS_LIST = createRoutine("GET_EVENTS_LIST");
const GET_LANG_LIST = createRoutine("GET_LANG_LIST");
const GET_PUSH_NOTIFICATIONS_LIST = createRoutine("GET_PUSH_NOTIFICATIONS_LIST");
const UPLOAD_NOTIFICATIONS_PHOTO = createRoutine("UPLOAD_NOTIFICATIONS_PHOTO");
const SEND_TEST_PUSH_NOTIFICATION = createRoutine("SEND_TEST_PUSH_NOTIFICATION");
const SEND_PUSH_NOTIFICATION = createRoutine("SEND_PUSH_NOTIFICATION");
const CANCEL_SCHEDULED_NOTIFICATION = createRoutine("CANCEL_SCHEDULED_NOTIFICATION");
const RESEND_CANCELLED_NOTIFICATION = createRoutine("RESEND_CANCELLED_NOTIFICATION");
const GET_COUNTRY_USERS_COUNT = createRoutine("GET_COUNTRY_USERS_COUNT");
const DOWNLOAD_USER_EXCEL_FILE = createRoutine("DOWNLOAD_USER_EXCEL_FILE");
const UPLOAD_EVENT_PHOTO = createRoutine("UPLOAD_EVENT_PHOTO");
const CREATE_EVENT = createRoutine("CREATE_EVENT");
const GET_ONE_NOTIFICATION = createRoutine("GET_ONE_NOTIFICATION");
const GET_ONE_EVENT = createRoutine("GET_ONE_EVENT");
const EDIT_AND_SAVE_EVENT = createRoutine("EDIT_AND_SAVE_EVENT");
const RESEND_CANCELLED_EVENT = createRoutine("RESEND_CANCELLED_EVENT");
const EDIT_AND_SAVE_NOTIFICATION = createRoutine("EDIT_AND_SAVE_NOTIFICATION");
const LOAD_USERS_BY_STATUS = createRoutine("LOAD_USERS_BY_STATUS");
const SET_INITIAL_USERS_PAGINATION_PAGE = createRoutine("SET_INITIAL_USERS_PAGINATION_PAGE");

export default {
    GET_USERS_LIST,
    GET_USER,
    CHANGE_USER_STATUS,
    GET_USER_REPORT,
    GET_CARDS_LIST,
    GET_EVENTS_LIST,
    GET_ONE_EVENT,
    GET_LANG_LIST,
    GET_PUSH_NOTIFICATIONS_LIST,
    UPLOAD_NOTIFICATIONS_PHOTO,
    SEND_TEST_PUSH_NOTIFICATION,
    SEND_PUSH_NOTIFICATION,
    CANCEL_SCHEDULED_NOTIFICATION,
    RESEND_CANCELLED_NOTIFICATION,
    GET_COUNTRY_USERS_COUNT,
    DOWNLOAD_USER_EXCEL_FILE,
    UPLOAD_EVENT_PHOTO,
    CREATE_EVENT,
    GET_ONE_NOTIFICATION,
    RESEND_CANCELLED_EVENT,
    EDIT_AND_SAVE_EVENT,
    EDIT_AND_SAVE_NOTIFICATION,
    LOAD_USERS_BY_STATUS,
    SET_INITIAL_USERS_PAGINATION_PAGE,
}
