import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import CancelledNotificationContainer from "../containers/CancelledNotificationContainer";

const CancelledNotificationPage = ({match}) => {
    return (
        <>
            <CancelledNotificationContainer id={get(match, 'params.id', null)}/>
        </>
    );
};

export default withRouter(CancelledNotificationPage);
