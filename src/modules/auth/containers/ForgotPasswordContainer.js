import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Loader from "../../../components/loader";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordContainer = ({history}) => {
    const [loading, setLoading] = useState(false);

    const forgotPassword = ({data, setError}) => {
        setLoading(true);
        ApiService.ForgotPassword({...data}).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success(`Success`);
            }
        }).catch((e) => {
            setLoading(false);
            if (e.response.data && e.response.data.errors) {
                e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`));
                return
            }
            toast.error(`ERROR`);
        })
    }

    return (
        <>
            {loading && <Loader/>}
            <ForgotPasswordForm forgotPassword={forgotPassword}/>
        </>
    );
};
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPasswordContainer));
