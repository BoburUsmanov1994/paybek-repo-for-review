import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import ScheduledEventContainer from "../containers/ScheduledEventContainer";

const ScheduledEventPage = ({match}) => {
    return (
        <>
            <ScheduledEventContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(ScheduledEventPage);
