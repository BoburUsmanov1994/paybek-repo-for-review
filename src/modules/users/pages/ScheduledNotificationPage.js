import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import ScheduledNotificationContainer from "../containers/ScheduledNotificationContainer";

const ScheduledNotificationPage = ({match}) => {
    return (
        <>
            <ScheduledNotificationContainer id={get(match, 'params.id', null)}/>
        </>
    );
};

export default withRouter(ScheduledNotificationPage);
