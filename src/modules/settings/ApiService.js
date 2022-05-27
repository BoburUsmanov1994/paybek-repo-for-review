import {request} from "../../services/api";

class ApiService{

    static EditProfile = ({firstName,lastName}) => {
        return request.put('/api/auth/v1/user-web/edit-user', {firstName,lastName});
    }

    static ChangePassword = ({currentPassword,newPassword,confirmNewPassword}) => {
        return request.put('/api/auth/v1/user-web/change-password', {currentPassword,newPassword,confirmNewPassword});
    }

    static ChangeProfileImg = (formData) => {
        return request.put('/api/auth/v1/user-web/change-picture', formData);
    }
}

export default ApiService;