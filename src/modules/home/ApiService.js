import {request} from "../../services/api";

class ApiService{

    static GetDashboardData= ({type, dateNumber, gettingTypeNumber}) => {
        return request.post(`/api/report/v1/txn?type=${type}`, { dateNumber, gettingTypeNumber } );
    }
}

export default ApiService;