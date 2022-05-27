import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import PgEditContainer from "../containers/PgEditContainer";

const PgEditPage = ({match}) => {
    return (
        <>
            <PgEditContainer id={get(match,'params.id')}/>
        </>
    );
};

export default withRouter(PgEditPage);
