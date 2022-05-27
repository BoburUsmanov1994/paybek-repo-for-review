import {request} from "../../services/api";

class ApiService{

    static GetStaffList= (params) => {
        return request.post('/api/auth/v1/user-web/staff-list', {...params});
    }

    static CreateStaff= (params) => {
        return request.post('/api/auth/v1/user-web/add-staff', {...params});
    }

    static GetAccountTypesList= (params) => {
        return request.get('/api/auth/v1/role', {params:{...params}});
    }

    static CreateAccountType= (params) => {
        return request.post('/api/auth/v1/role', {...params});
    }

    static EditAccountType= (params) => {
        return request.put('/api/auth/v1/role', {...params});
    }

    static GetPagesAndPermissions= (id = null) => {
        return request.get('/api/auth/v1/role/forAddOrEdit',{params:{roleId:id}});
    }

    static GetCountryList= (params) => {
        return request.get('/api/ding/v1/country/get-all',{params:{...params}});
    }

    static GetOneStaff= (staffId) => {
        return request.get(`/api/auth/v1/user-web/one-staff/${staffId}`);
    }

    static UpdateStaff= (params) => {
        return request.put(`/api/auth/v1/user-web/edit-staff`,{...params});
    }

}

export default ApiService;