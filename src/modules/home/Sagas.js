import {all, call, put, takeLatest} from "redux-saga/effects";
import {get} from "lodash";
import axios from "axios";
import Actions from "./Actions";
import ApiService from "./ApiService";
import NormalizerAction from "../../services/normalizer/actions";
import Normalizer from "../../services/normalizer";

function* getDashboardDataRequest(action) {
    const {type, dateNumber, gettingTypeNumber} = action.payload;
    try {
        const {data} = yield call(ApiService.GetDashboardData, {type, dateNumber, gettingTypeNumber});
        const normalizedData = yield call(Normalizer.Normalize, get(data, 'data', null), {});
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {...normalizedData, storeName: 'dashboard-data',entity:''},
        });
        yield put({type: Actions.GET_DASHBOARD_DATA.SUCCESS});
    } catch (e) {
        yield put({type: Actions.GET_DASHBOARD_DATA.FAILURE});
    }
}

function* getDefaultValueDashboardLine(action) {
    console.log("saga", action);
    yield put({ type: "SAVE_DEFAULT_DATA", payload: action.payload});
}




export default function* sagas() {
    yield all([
        takeLatest(Actions.GET_DASHBOARD_DATA.REQUEST, getDashboardDataRequest),
        takeLatest("SAVE_GRAFIC_DEFAULT_DATA", getDefaultValueDashboardLine),
    ]);
}
