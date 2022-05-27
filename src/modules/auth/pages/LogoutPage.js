import React,{useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Actions from "../Actions";

const LogoutPage = ({history,logout}) => {
    useEffect( ()=>{
        logout();
        history.push('/')
    },[])
    return (
        <>
            Logout
        </>
    );
};

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout:()=>dispatch({type:Actions.LOGOUT.REQUEST})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LogoutPage));
