import { all, call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import Actions from "./Actions";
import ApiService from "./ApiService";
import Normalizer from "../../services/normalizer";
import { get } from "lodash";
import NormalizerAction from "../../services/normalizer/actions";
import ClientScheme from "../../schema/ClientScheme";
import CardScheme from "../../schema/CardScheme";
import EventScheme from "../../schema/EventScheme";
import NotificationScheme from "../../schema/NotificationScheme";
import TxnsScheme from "../../schema/TxnsScheme";

function* getUsersListRequest(action) {
  const { params } = action.payload;
  try {
    const { data } = yield call(ApiService.GetClientList, params);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      { content: [ClientScheme] }
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "client-list",
        entityName: "client",
      },
    });
    yield put({ type: Actions.GET_USERS_LIST.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_USERS_LIST.FAILURE });
  }
}

function* getUserRequest(action) {
  const { params } = action.payload;
  try {
    const { data } = yield call(ApiService.GetClient, params);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      { content: [TxnsScheme] }
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "get-client-one",
        entityName: "txns",
      },
    });
    yield put({ type: Actions.GET_USER.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_USER.FAILURE });
  }
}

function* getUserReportRequest(action) {
  const { userId } = action.payload;
  try {
    const { data } = yield call(ApiService.GetClientReport, userId);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      {}
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "get-client-report",
        entityName: "",
      },
    });
    yield put({ type: Actions.GET_USER_REPORT.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_USER_REPORT.FAILURE });
  }
}

function* getCardsListRequest(action) {
  const { params } = action.payload;
  try {
    const { data } = yield call(ApiService.GetCardsList, params);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      { content: [CardScheme] }
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "card-list",
        entityName: "card",
      },
    });
    yield put({ type: Actions.GET_CARDS_LIST.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_CARDS_LIST.FAILURE });
  }
}

function* getEventsListRequest(action) {
  const { params } = action.payload;
  try {
    const { data } = yield call(ApiService.GetEventsList, params);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      { content: [EventScheme] }
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "events-list",
        entityName: "event",
      },
    });
    yield put({ type: Actions.GET_EVENTS_LIST.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_CARDS_LIST.FAILURE });
  }
}

function* getLangListRequest(action) {
  const { params } = action.payload;
  try {
    const { data } = yield call(ApiService.GetLangList, params);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      {}
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName: "lang-list", entityName: "" },
    });
    yield put({ type: Actions.GET_LANG_LIST.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_LANG_LIST.FAILURE });
  }
}

function* getPushNotificationsListRequest(action) {
  const { params } = action.payload;
  try {
    const { data } = yield call(ApiService.GetPushnotificationsList, params);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      { content: [NotificationScheme] }
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "notifications-list",
        entityName: "notification",
      },
    });
    yield put({ type: Actions.GET_PUSH_NOTIFICATIONS_LIST.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_PUSH_NOTIFICATIONS_LIST.FAILURE });
  }
}

function* getOneNotificationRequest(action) {
  const { id } = action.payload;
  try {
    const { data } = yield call(ApiService.GetOneNotification, id);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      NotificationScheme
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "get-one-notification",
        entityName: "notification",
      },
    });
    yield put({ type: Actions.GET_ONE_NOTIFICATION.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_ONE_NOTIFICATION.FAILURE });
  }
}

function* getOneEventRequest(action) {
  const { id } = action.payload;
  try {
    const { data } = yield call(ApiService.GetOneEvent, id);
    const normalizedData = yield call(
      Normalizer.Normalize,
      get(data, "data", null),
      EventScheme
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "get-one-event",
        entityName: "event",
      },
    });
    yield put({ type: Actions.GET_ONE_NOTIFICATION.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.GET_ONE_NOTIFICATION.FAILURE });
  }
}

function* getUserStatusReport() {
  try {
    const { data } = yield call(ApiService.GetUsersBbyStatus);
    yield put({type: "GET_USER_BY_STATUS", payload: data.data.userData})
  } catch(e) {
    console.log(e);
  }
}

export default function* sagas() {
  yield all([
    takeLatest(Actions.GET_USERS_LIST.REQUEST, getUsersListRequest),
    takeLatest(Actions.GET_USER.REQUEST, getUserRequest),
    takeLatest(Actions.GET_USER_REPORT.REQUEST, getUserReportRequest),
    takeLatest(Actions.GET_CARDS_LIST.REQUEST, getCardsListRequest),
    takeLatest(Actions.GET_EVENTS_LIST.REQUEST, getEventsListRequest),
    takeLatest(Actions.GET_LANG_LIST.REQUEST, getLangListRequest),
    takeLatest(Actions.GET_PUSH_NOTIFICATIONS_LIST.REQUEST, getPushNotificationsListRequest),
    takeLatest(Actions.GET_ONE_NOTIFICATION.REQUEST, getOneNotificationRequest),
    takeLatest(Actions.GET_ONE_EVENT.REQUEST, getOneEventRequest),
    takeLatest(Actions.LOAD_USERS_BY_STATUS.REQUEST, getUserStatusReport)
  ]);
}
