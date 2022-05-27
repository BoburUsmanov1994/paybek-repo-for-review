
import {request} from "../../services/api";

class ApiService{

    static GetPgList= (params) => {
        return request.get('/api/stripe/v1/payment-margin', {params:{...params}});
    }

    static GetPgOne = (id) => {
        return request.get(`/api/stripe/v1/payment-margin/${id}`);
    }

    static CreateOrEditPg = (params) => {
        return request.post(`/api/stripe/v1/payment-margin`, {...params});
    }
    static GetCountriesFromDing = () => {
        return request.get(`/api/ding/v1/country/get-from-ding`);
    }
}

export default ApiService;