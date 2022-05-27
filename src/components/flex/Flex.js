import React from 'react';
import styled from "styled-components";

const StyledFlex = styled.div`
  display: flex;
  align-items: ${({align}) => align || 'center'};
  justify-content: ${({justify}) => justify || 'flex-start'};
  flex-direction: ${({column})=> column ? 'column' : 'row'};
`;
const Flex = (props) => {
    return (
        <StyledFlex {...props} />
    );
};

export default Flex;
