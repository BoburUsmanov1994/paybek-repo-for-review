import {request} from "../../services/api";

class ApiService {

    static GetClientList = (params) => {
        return request.post('/api/auth/v1/user-web/client-list', {...params});
    }

    static GetClient = (params) => {
        return request.get(`/api/report/v1/txn/user`, {params: {...params}});
    }

    static ChangeClientStatus = (userId) => {
        return request.patch(`/api/auth/v1/user-web/change-user-status/${userId}`);
    }

    static GetClientReport = (userId) => {
        return request.get(`/api/report/v1/txn/user/amount`, {params: {userId}});
    }

    static GetCardsList = (params) => {
        return request.get('/api/stripe/v1/card/types', {params: {...params}});
    }

    static GetEventsList = (params) => {
        return request.post('/api/notification/v1/event/list-for-web', {...params});
    }

    static GetLangList = () => {
        return request.get('/api/auth/v1/web/languages');
    }

    static GetPushnotificationsList = (params) => {
        return request.post('/api/notification/v1/notification/list-for-web', {...params});
    }

    static UploadNotificationPhoto = (formData) => {
        return request.post('/api/notification/v1/attachment/upload-photo', formData);
    }

    static SendTestPushNotification = (params) => {
        return request.post('/api/notification/v1/notification/send-test', {...params});
    }

    static SendPushNotification = (id) => {
        return request.patch(`/api/notification/v1/notification/send/${id}`);
    }

    static CancelScheduledNotification = (id) => {
        return request.patch(`/api/notification/v1/notification/cancel-scheduled/${id}`);
    }

    static ResendCancelledNotification = (id) => {
        return request.patch(`/api/notification/v1/notification/resend-cancelled/${id}`);
    }

    static GetCountryUsersCount = (params) => {
        return request.post(`/api/ding/v1/country/get/user-count`, {...params});
    }

    static DownloadUserExcelFile = (userId) => {
        return request.post(`/api/report/v1/txn/download/excel/${userId}`, {
            countryId: "",
            fromDate: "",
            page: 0,
            searchingField: "",
            size: 10,
            toDate: "",
            totalElements: 0,
            txnStatusEnum: "ALL"
        },{responseType:'blob'});
    }

    static CreateEvent = (params) => {
        return request.post(`/api/notification/v1/event`, {...params});
    }

    static GetOneEvent = (id) => {
        return request.get(`/api/notification/v1/event/one-for-web/${id}`);
    }

    static EditOrSaveEvent = (params) => {
        return request.post(`/api/notification/v1/event`,{...params});
    }

    static ResendCancelledEvent = (id) => {
        return request.patch(`/api/notification/v1/event/resend-cancelled/${id}`);
    }

    static CancelScheduledEvent = (id) => {
        return request.patch(`/api/notification/v1/event/cancel-scheduled/${id}`);
    }

    static GetOneNotification = (id) => {
        return request.get(`/api/notification/v1/notification/one-for-web/${id}`);
    }

    static GetUsersBbyStatus = () => {
        return request.post(`/api/report/v1/txn?type=month`, {dateNumber: 1, gettingTypeNumber: 1} );
    }
}

export default ApiService;