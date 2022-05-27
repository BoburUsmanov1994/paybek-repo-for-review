import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get} from "lodash";
import LoginForm from "../components/LoginForm";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import TokenScheme from "../../../schema/TokenScheme";
import Loader from "../../../components/loader";

const LoginContainer = ({history, signInRequest, token, isFetched, checkAuthRequest, entities}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isFetched && token) {
            token = Normalizer.Denormalize(token, TokenScheme, entities);
            checkAuthRequest({token: get(token, 'accessToken', null)});
            history.push('/');
        }
    }, [token]);


    const login = ({data, setError}) => {
        signInRequest({...data, setError, setLoading});
    }

    return (
        <>
            {loading && <Loader/>}
            <LoginForm login={login}/>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        token: get(state, 'normalizer.data.get-token.result', null),
        isFetched: get(state, 'normalizer.data.get-token.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signInRequest: ({email, password, setError, setLoading}) => dispatch({
            type: Actions.SIGN_IN.REQUEST,
            payload: {email, password, setError, setLoading}
        }),
        checkAuthRequest: ({token}) => dispatch({type: Actions.CHECK_AUTH.REQUEST, token}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));
