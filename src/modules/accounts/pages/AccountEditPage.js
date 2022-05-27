import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import AccountEditContainer from "../containers/AccountEditContainer";

const AccountEditPage = ({match}) => {
    return (
        <>
            <AccountEditContainer staffId={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(AccountEditPage);
