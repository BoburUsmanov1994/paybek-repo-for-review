import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import StartedEventContainer from "../containers/StartedEventContainer";

const StartedEventPage = ({match}) => {
    return (
        <>
            <StartedEventContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(StartedEventPage);
