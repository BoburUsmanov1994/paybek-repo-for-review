import React from 'react';
import styled from "styled-components";

const StyledNodata = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  font-size: 16px;
  width: 100%;
`;
const Nodata = (props) => {
    return (
        <StyledNodata {...props}>
            No Data
        </StyledNodata>
    );
};

export default Nodata;
