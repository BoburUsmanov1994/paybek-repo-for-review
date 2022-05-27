import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import CancelledEventContainer from "../containers/CancelledEventContainer";

const CancelledEventPage = ({match}) => {
    return (
        <>
            <CancelledEventContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(CancelledEventPage);
