import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: ${({width})=>width || '100%'};
  margin: 0 auto;
  padding:${({padding})=>padding || '25px 0 50px 0'} ;
`;

const Container = (props) => {
    return <StyledContainer {...props} />;
};

export default Container;
