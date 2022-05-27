import React from 'react';
import {withRouter} from 'react-router-dom';
import styled from "styled-components";

const StyledNotFoundPage = styled.div`
  height: 70vh;
  padding: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
`;
const NotFoundPage = (props) => {
    return (
        <StyledNotFoundPage {...props}>
            404 PAGE NOT FOUND
        </StyledNotFoundPage>
    );
};

export default withRouter(NotFoundPage);
