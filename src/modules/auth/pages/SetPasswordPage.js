import React from 'react';
import {useParams} from "react-router-dom";
import SetPasswordContainer from "../containers/SetPasswordContainer";

const SetPasswordPage = (props) => {
    const {uid = null} = useParams();
    return (
        <>
            <SetPasswordContainer uid={uid}/>
        </>
    );
};

export default SetPasswordPage;
