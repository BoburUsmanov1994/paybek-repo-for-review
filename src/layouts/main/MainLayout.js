import React from 'react';
import {ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import {get} from "lodash";
import Header from "../../components/header/Header";


const MainLayout = ({children,user}) => {
    return (
        <>
            <Header user={user}/>
            <ToastContainer />
            {children}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        user:get(state,'auth.user',{})
    }
}
export default connect(mapStateToProps,null)(MainLayout);
