import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import UserDetailContainer from "../containers/UserDetailContainer";

const UserDetailPage = ({match = {}}) => {
    return (
        <>
         <UserDetailContainer userId = {get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(UserDetailPage);
