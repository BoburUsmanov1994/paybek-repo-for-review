import {createRoutine} from "redux-saga-routines";

const EDIT_PROFILE = createRoutine("EDIT_PROFILE");
const CHANGE_PROFILE_IMG = createRoutine("CHANGE_PROFILE_IMG");

export default {
    EDIT_PROFILE,
    CHANGE_PROFILE_IMG,
}
