import { all, call, put, takeLatest } from "redux-saga/effects";
import Actions from "./Actions";
import ApiService from "./ApiService";
import Normalizer from "../../services/normalizer";
import { get } from "lodash";
import NormalizerAction from "../../services/normalizer/actions";
import StaffScheme from "../../schema/StaffScheme";
import AccountTypeScheme from "../../schema/AccountTypeScheme";
import DepartmentScheme from "../../schema/DepartmentScheme";
import PermissionScheme from "../../schema/PermissionScheme";
import CountryScheme from "../../schema/CountryScheme";

function* getStaffListRequest(action) {
    const { params } = action.payload;
    try {
        const { data } = yield call(ApiService.GetStaffList, params);
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(data, "data", null),
            { content: [StaffScheme] }
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "staff-list",
                entityName: "staff",
            },
        });
        yield put({ type: Actions.GET_STAFF_LIST.SUCCESS });
    } catch (e) {
        yield put({ type: Actions.GET_STAFF_LIST.FAILURE });
    }
}

function* getAccountTypeListRequest(action) {
    const { params } = action.payload;
    try {
        const { data } = yield call(ApiService.GetAccountTypesList, params);
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(data, "data", null),
            { content: [AccountTypeScheme] }
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "account-types-list",
                entityName: "accountType",
            },
        });
        yield put({ type: Actions.GET_ACCOUNT_TYPE_LIST.SUCCESS });
    } catch (e) {
        yield put({ type: Actions.GET_ACCOUNT_TYPE_LIST.FAILURE });
    }
}

function* getPagesAndPermissionsRequest(action) {
    const { id = null } = action.payload;
    try {
        const { data } = yield call(ApiService.GetPagesAndPermissions, id);
        const normalizedDataDepartment = yield call(
            Normalizer.Normalize,
            get(data, "data", {}),
            {
                departments: [DepartmentScheme],
                permissionList: [PermissionScheme],
            }
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedDataDepartment,
                storeName: "get-role",
                entityName: "role",
            },
        });
        yield put({ type: Actions.GET_PAGES_AND_PERMISSIONS.SUCCESS });
    } catch (e) {
        yield put({ type: Actions.GET_PAGES_AND_PERMISSIONS.FAILURE });
    }
}

// gets all pages and departments

function* getPagesAndPermissionsRequestAll(action) {
    const { id = null } = action.payload;
    try {
        const { data } = yield call(ApiService.GetPagesAndPermissions, id);
        yield put({
            type: Actions.SET_ALL_PAGES_AND_PERMISSIONS.REQUEST,
            payload: data,
        });
        yield put({ type: Actions.SET_ALL_PAGES_AND_PERMISSIONS.SUCCESS });
    } catch (e) {
        yield put({ type: Actions.SET_ALL_PAGES_AND_PERMISSIONS.FAILURE });
    }
}

function* getCountryListRequest(action) {
    const { params } = action.payload;
    try {
        const { data } = yield call(ApiService.GetCountryList, params);
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(data, "data.content", null),
            [CountryScheme]
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "country-list",
                entityName: "country",
            },
        });
        yield put({ type: Actions.GET_COUNTRY_LIST.SUCCESS });
    } catch (e) {
        yield put({ type: Actions.GET_COUNTRY_LIST.FAILURE });
    }
}

function* getOneStaffRequest(action) {
    const { staffId } = action.payload;
    console.log("staff id", staffId);
    try {
        const { data } = yield call(ApiService.GetOneStaff, staffId);
        console.log(data);
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(data, "data", null),
            StaffScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "get-one-staff",
                entityName: "staff",
            },
        });
        yield put({ type: Actions.GET_ONE_STAFF.SUCCESS });
    } catch (e) {
        yield put({ type: Actions.GET_ONE_STAFF.FAILURE });
    }
}

export default function* sagas() {
    yield all([
        takeLatest(Actions.GET_STAFF_LIST.REQUEST, getStaffListRequest),
        takeLatest(
            Actions.GET_ACCOUNT_TYPE_LIST.REQUEST,
            getAccountTypeListRequest
        ),
        takeLatest(
            Actions.GET_PAGES_AND_PERMISSIONS.REQUEST,
            getPagesAndPermissionsRequest
        ),
        takeLatest(Actions.GET_COUNTRY_LIST.REQUEST, getCountryListRequest),
        takeLatest(Actions.GET_ONE_STAFF.REQUEST, getOneStaffRequest),
        takeLatest(
            Actions.GET_ALL_PAGES_AND_PERMISSIONS.REQUEST,
            getPagesAndPermissionsRequestAll
        ),
    ]);
}
