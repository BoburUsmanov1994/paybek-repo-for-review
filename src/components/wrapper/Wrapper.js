import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
@media (min-width: 1921px){
  width: 1920px;
  margin: 0 auto;
}
  @media (max-width: 1280px){
    width: 1280px;
    margin: 0 auto;
    overflow-x: auto;
  }
`;
const Wrapper = ({children}) => {
    return (
        <StyledWrapper>
            {children}
        </StyledWrapper>
    );
};

export default Wrapper;
