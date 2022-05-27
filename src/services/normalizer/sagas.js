import { all, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';

function* requestNormalize(action) {
    const { entities, result, storeName, entityName } = action.payload;
    try {
        yield put({
            type: actions.NORMALIZE.SUCCESS,
            payload: { entities, result, storeName, entityName },
        });
    } catch (e) {
        yield put({
            type: actions.NORMALIZE.FAILURE,
            payload: {
                storeName,
                entityName,
            },
        });
    }
}


export default function* sagas() {
    yield all([takeLatest(actions.NORMALIZE.REQUEST, requestNormalize)]);
}
