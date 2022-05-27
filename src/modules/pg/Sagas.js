import {all, call, put, takeLatest} from "redux-saga/effects";
import Actions from "./Actions";
import ApiService from "./ApiService";
import Normalizer from "../../services/normalizer";
import {get} from "lodash";
import NormalizerAction from "../../services/normalizer/actions";
import PgScheme from "../../schema/PgScheme";
import DingCountryScheme from "../../schema/DingCountryScheme";


function* getPgListRequest(action) {
    const {params} = action.payload;
    try {
        const {data} = yield call(ApiService.GetPgList, params);
        const normalizedData = yield call(Normalizer.Normalize, get(data, 'data', null), {content:[PgScheme]});
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {...normalizedData, storeName: 'pg-list', entityName: 'pg'},
        });
        yield put({type: Actions.GET_PG_LIST.SUCCESS});
    } catch (e) {
        yield put({type: Actions.GET_PG_LIST.FAILURE});
    }
}

function* getPgOneRequest(action) {
    const {id} = action.payload;
    try {
        const {data} = yield call(ApiService.GetPgOne, id);
        const normalizedData = yield call(Normalizer.Normalize, get(data, 'data', null), PgScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {...normalizedData, storeName: 'get-pg-one', entityName: 'pg'},
        });
        yield put({type: Actions.GET_PG_ONE.SUCCESS});
    } catch (e) {
        yield put({type: Actions.GET_PG_ONE.FAILURE});
    }
}

function* getCountriesFromDingRequest(action) {

    try {
        const {data} = yield call(ApiService.GetCountriesFromDing);
        const normalizedData = yield call(Normalizer.Normalize, get(data, 'data', []), [DingCountryScheme]);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {...normalizedData, storeName: 'get-countries-from-ding', entityName: 'ding-country'},
        });
        yield put({type: Actions.GET_COUNTRIES_FROM_DING.SUCCESS});
    } catch (e) {
        yield put({type: Actions.GET_COUNTRIES_FROM_DING.FAILURE});
    }
}





export default function* sagas() {
    yield all([
        takeLatest(Actions.GET_PG_LIST.REQUEST, getPgListRequest),
        takeLatest(Actions.GET_PG_ONE.REQUEST, getPgOneRequest),
        takeLatest(Actions.GET_COUNTRIES_FROM_DING.REQUEST, getCountriesFromDingRequest),
    ]);
}
