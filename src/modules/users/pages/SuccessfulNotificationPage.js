import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import SuccessFulNotificationContainer from "../containers/SuccessfulNotificationContainer";

const SuccessfulNotificationPage = ({match}) => {
    return (
        <>
            <SuccessFulNotificationContainer id={get(match, 'params.id', null)}/>
        </>
    );
};

export default withRouter(SuccessfulNotificationPage);
