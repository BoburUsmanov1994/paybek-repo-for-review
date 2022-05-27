import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import TxnsDetailContainer from "../containers/TxnsDetailContainer";

const TxnsDetailPage = ({match}) => {
    return (
        <>
        <TxnsDetailContainer id={get(match,'params.id',null)}/>
        </>
    );
};

export default withRouter(TxnsDetailPage);
