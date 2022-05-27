import {request} from "../../services/api";

class ApiService{

    static GetTxnsList= (params) => {
        return request.post('/api/report/v1/txn/get-all', {...params});
    }

    static GetTxnsOne= (id) => {
        return request.get(`/api/report/v1/txn/${id}`);
    }

    static GetTxnsReportCount = (id = '', fromDate = '', toDate = '', txnStatusEnum = 'ALL') => {
        return request.get(`/api/report/v1/txn/amount?countryId=${id}&fromDate=${fromDate}&toDate=${toDate}&status=${txnStatusEnum}`);
    }

    static GetTxnsStatusCount= () => {
        return request.get(`/api/report/v1/txn/status/count`);
    }

    static DownloadTxnsExcelFile= (params = {}) => {
        return request.post('/api/report/v1/txn/download/excel', {...params},{responseType:'blob'});
    }

    static DownloadTxnsPdfFile= (id) => {
        return request.get(`/api/report/v1/txn/download/pdf/${id}`,{responseType:'blob'});
    }

    static UpdateTxnsRefund= (paymentId) => {
        return request.put(`/api/stripe/v1/payment/refund/${paymentId}`);
    }

    static UpdateTxnsReprocess = (paymentId) => {
        return request.put(`/api/stripe/v1/payment/reprocess/${paymentId}`);
    }

    static GetTxnsOneHistory = (paymentId) => {
        return request.get(`/api/stripe/v1/payment/history/${paymentId}`);
    }
}

export default ApiService;