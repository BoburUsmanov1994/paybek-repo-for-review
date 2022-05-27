import { all, call, put, takeLatest } from "redux-saga/effects";
import Actions from "./Actions";
import ApiService from "./ApiService";
import Normalizer from "../../services/normalizer";
import { get } from "lodash";
import NormalizerAction from "../../services/normalizer/actions";
import TxnsScheme from "../../schema/TxnsScheme";

function* getTxnsListRequest(action) {
  const { params } = action.payload;
  try {
    const { data } = yield call(ApiService.GetTxnsList, params);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", {}),
      { content: [TxnsScheme] }
    );

    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "txns-list",
        entityName: "txns",
      },
    });
    yield put({ type: Actions.GET_TXNS_LIST.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_TXNS_LIST.FAILURE });
  }
}

function* getTxnsOneRequest(action) {
  const { id } = action.payload;

  try {
    const { data } = yield call(ApiService.GetTxnsOne, id);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", {}),
      TxnsScheme
    );

    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "get-txns-one",
        entityName: "txns",
      },
    });
    yield put({ type: Actions.GET_TXNS_ONE.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_TXNS_ONE.FAILURE });
  }
}

function* getTxnsReportCountRequest(action) {
  const { id } = action.payload;
  const { fromDate } = action.payload;
  const { toDate } = action.payload;
  const { txnStatusEnum } = action.payload;

  try {
    const { data } = yield call(ApiService.GetTxnsReportCount, id, fromDate, toDate, txnStatusEnum);
    const normalizedData = yield call(Normalizer.Normalize, get(data, "data", null), {});

    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName: "report-count", entity: "" },
    });
    yield put({ type: Actions.GET_TXNS_REPORT_COUNT.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_TXNS_REPORT_COUNT.FAILURE });
  }
}

function* getTxnsStatusCountRequest(action) {
  try {
    const { data } = yield call(ApiService.GetTxnsStatusCount);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      {}
    );

    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName: "status-count", entity: "" },
    });
    yield put({ type: Actions.GET_TXNS_STATUS_COUNT.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_TXNS_STATUS_COUNT.FAILURE });
  }
}

function* getTxnsOneHistoryRequest(action) {
  const { id: paymentId } = action.payload;
  try {
    const { data } = yield call(ApiService.GetTxnsOneHistory, paymentId);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      {}
    );

    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "get-txns-one-history",
        entity: "",
      },
    });
    yield put({ type: Actions.GET_TXNS_ONE_HISTORY.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_TXNS_ONE_HISTORY.FAILURE });
  }
}

export default function* sagas() {
  yield all([
    takeLatest(Actions.GET_TXNS_LIST.REQUEST, getTxnsListRequest),
    takeLatest(Actions.GET_TXNS_ONE.REQUEST, getTxnsOneRequest),
    takeLatest(
      Actions.GET_TXNS_REPORT_COUNT.REQUEST,
      getTxnsReportCountRequest
    ),
    takeLatest(
      Actions.GET_TXNS_STATUS_COUNT.REQUEST,
      getTxnsStatusCountRequest
    ),
    takeLatest(Actions.GET_TXNS_ONE_HISTORY.REQUEST, getTxnsOneHistoryRequest),
  ]);
}
