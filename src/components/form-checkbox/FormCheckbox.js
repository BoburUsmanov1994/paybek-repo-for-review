import React from 'react';
import styled from "styled-components";
import Checkbox from 'rc-checkbox';

const StyledFormCheckbox = styled.div`
`;
const FormCheckbox = ({label,defaultChecked=false,handleChange = () => {},...props}) => {
    return (
        <StyledFormCheckbox {...props}>
            <label><Checkbox onChange={handleChange} defaultChecked={defaultChecked}/><span>{label}</span></label>
        </StyledFormCheckbox>
    );
};

export default FormCheckbox;
