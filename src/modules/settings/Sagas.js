import {all, call, put, takeLatest} from "redux-saga/effects";
import Actions from "./Actions";
import ApiService from "./ApiService";

function* editProfileRequest(action) {
    const {firstName,lastName} = action.payload;
    try {
        const {data} = yield call(ApiService.EditProfile, {firstName,lastName});

    } catch (e) {

    }
}



export default function* sagas() {
    yield all([
        takeLatest(Actions.EDIT_PROFILE.REQUEST, editProfileRequest),
    ]);
}
