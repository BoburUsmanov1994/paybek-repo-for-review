import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Loader from "../../../components/loader";
import SetPasswordForm from "../components/SetPasswordForm";
import ApiService from "../ApiService";
import {toast} from "react-toastify";

const SetPasswordContainer = ({history, uid}) => {
    const [loading, setLoading] = useState(false);

    const setPassword = ({data, setError}) => {
        setLoading(true);
        ApiService.SetPassword({emailCode: uid, ...data}).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success(`Success`);
                history.push('/auth')
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
            <SetPasswordForm setPassword={setPassword}/>
        </>
    );
};
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SetPasswordContainer));
