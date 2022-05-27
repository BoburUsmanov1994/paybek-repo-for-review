import {request} from "../../services/api";

class ApiService{

    static SignIn = (email,password) => {
        return request.post('/api/auth/v1/web/sign-in', {email,password});
    }

    static ForgotPassword = ({email}) => {
        return request.post('/api/auth/v1/web/forgot-password', {email});
    }

    static RefreshToken = () => {
        return request.get('/api/auth/v1/web/refresh-token');
    }

    static SetPassword = ({emailCode,password,prePassword}) => {
        return request.post('/api/auth/v1/web/set-password',{emailCode,password,prePassword});
    }


    static GetMe = (token = null) => {
        if (token) {
            return request.get('/api/auth/v1/user-web/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        }

        return request.get('/api/auth/v1/user-web/me');
    }


}

export default ApiService;