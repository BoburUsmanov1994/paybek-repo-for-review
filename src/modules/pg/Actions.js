import {createRoutine} from "redux-saga-routines";

const GET_PG_LIST = createRoutine("GET_PG_LIST");
const GET_PG_ONE = createRoutine("GET_PG_ONE");
const GET_COUNTRIES_FROM_DING = createRoutine("GET_COUNTRIES_FROM_DING");

export default {
    GET_PG_LIST,
    GET_PG_ONE,
    GET_COUNTRIES_FROM_DING
}
