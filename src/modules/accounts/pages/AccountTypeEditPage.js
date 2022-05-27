import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import AccountTypeEditContainer from "../containers/AccountTypeEditContainer";

const AccountTypeEditPage = ({match}) => {
    return (
        <>
            <AccountTypeEditContainer roleId={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(AccountTypeEditPage);
