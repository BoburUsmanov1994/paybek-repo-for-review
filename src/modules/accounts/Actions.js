/* eslint-disable import/no-anonymous-default-export */
import { createRoutine } from "redux-saga-routines";

const GET_ACCOUNT_TYPE_LIST = createRoutine("GET_ACCOUNT_TYPE_LIST");
const GET_STAFF_LIST = createRoutine("GET_STAFF_LIST");
const CREATE_ACCOUNT_TYPE = createRoutine("CREATE_ACCOUNT_TYPE");
const CREATE_STAFF = createRoutine("CREATE_STAFF");
const UPDATE_ACCOUNT = createRoutine("UPDATE_ACCOUNT");
const GET_PAGES_AND_PERMISSIONS = createRoutine("GET_PAGES_AND_PERMISSIONS");
const GET_COUNTRY_LIST = createRoutine("GET_COUNTRY_LIST");
const GET_ONE_STAFF = createRoutine("GET_ONE_STAFF");
const GET_ALL_PAGES_AND_PERMISSIONS = createRoutine(
    "GET_ALL_PAGES_AND_PERMISSIONS"
);
const SET_ALL_PAGES_AND_PERMISSIONS = createRoutine(
    "SET_ALL_PAGES_AND_PERMISSIONS"
);

export default {
    GET_ACCOUNT_TYPE_LIST,
    GET_STAFF_LIST,
    CREATE_ACCOUNT_TYPE,
    CREATE_STAFF,
    UPDATE_ACCOUNT,
    GET_PAGES_AND_PERMISSIONS,
    GET_COUNTRY_LIST,
    GET_ONE_STAFF,
    GET_ALL_PAGES_AND_PERMISSIONS,
    SET_ALL_PAGES_AND_PERMISSIONS,
};
