import {all, call, put, takeLatest} from "redux-saga/effects";
import {get} from "lodash";
import Actions from "./Actions";
import ApiService from "./ApiService";
import Storage from "../../services/local-storage/";
import Normalizer from "../../services/normalizer";
import NormalizerAction from "../../services/normalizer/actions";
import actions from "../../services/normalizer/actions";
import TokenScheme from "../../schema/TokenScheme";

function* checkAuthRequest(action) {
    const {token = null} = action;
    try {
        const {data} = yield call(ApiService.GetMe, token);
        yield put({
            type: Actions.CHECK_AUTH.SUCCESS,
            payload: {user: get(data, "data", null)},
        });
    } catch (e) {
        yield put({type: Actions.CHECK_AUTH.FAILURE});
    }
}

function* signInRequest(action) {
    const {
        payload: {email, password, setError, setLoading},
    } = action;

    try {
        setLoading(true);
        const {data} = yield call(ApiService.SignIn, email, password);
        yield put({
            type: Actions.SIGN_IN.SUCCESS,
            payload: {token: data.data},
        });
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(data, "data", null),
            TokenScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "get-token",
                entityName: "token",
            },
        });
        setLoading(false);
    } catch (error) {
        setLoading(false);
        let str = "";
        error?.response?.data?.errors.forEach(({errorMsg}) => {
            str += errorMsg;
        });
        yield put({type: Actions.SIGN_IN.FAILURE});
        if (str) {
            setError("password", {
                type: "validation",
                message: str,
            });
        }
    }
}

function* signInSuccess(action) {
    if (action && action.payload && action.payload.token) {
        Storage.set("token", JSON.stringify(action.payload.token));
    }
}

function* signInFailure() {
    Storage.remove("token");
}

function* logoutAuth() {
    yield put({
        type: actions.NORMALIZE.TRIGGER,
        payload: {storeName: "get-token"},
    });
    yield put({type: Actions.SIGN_IN.FAILURE});
    yield put({type: Actions.CHECK_AUTH.REQUEST});
}

function* setEnv(action) {
    const {
        payload: {env},
    } = action;

    try {
        Storage.set('env', env);
        yield put({
            type: Actions.SET_ENV.SUCCESS,
            payload: {env},
        });
    } catch (error) {
        console.log(error)
    }
}

export default function* sagas() {
    yield all([
        takeLatest(Actions.CHECK_AUTH.REQUEST, checkAuthRequest),
        takeLatest(Actions.SIGN_IN.REQUEST, signInRequest),
        takeLatest(Actions.SIGN_IN.SUCCESS, signInSuccess),
        takeLatest(Actions.SIGN_IN.FAILURE, signInFailure),
        takeLatest(Actions.LOGOUT.REQUEST, logoutAuth),
        takeLatest(Actions.SET_ENV.REQUEST, setEnv),
    ]);
}
