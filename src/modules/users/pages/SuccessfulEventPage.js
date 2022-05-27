import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash"
import SuccessfulEventContainer from "../containers/SuccessfulEventContainer";

const SuccessfulEventPage = ({match}) => {
    return (
        <>
            <SuccessfulEventContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(SuccessfulEventPage);
