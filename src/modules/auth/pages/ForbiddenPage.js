import React from 'react';
import {withRouter} from 'react-router-dom';
import styled from "styled-components";

const StyledForbiddenPage = styled.div`
  height: 70vh;
  padding: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
`;
const ForbiddenPage = (props) => {
    return (
        <StyledForbiddenPage {...props}>
            403 FORBIDDEN
        </StyledForbiddenPage>
    );
};

export default withRouter(ForbiddenPage);
